import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "../supabase/server";
import { invalidateSmtpCache } from "./email";
import type { Database, SmtpSettings, UserRole } from "../supabase/types";

const EMAIL_SUFFIX = "@internal.skyfreightsquad";
const usernameToEmail = (u: string) => `${u.trim().toLowerCase()}${EMAIL_SUFFIX}`;

/**
 * Verify the access token (passed in the server-fn payload) and return the
 * caller's profile. Supabase stores sessions in localStorage, so there's no
 * cookie to read — the client passes the access_token explicitly for each
 * admin call. Throws on any auth failure.
 */
async function requireAdmin(token: string | undefined) {
  if (!token) throw new Error("unauthorized");
  const anon = createClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data.user) throw new Error("unauthorized");

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();
  if (!profile || profile.role !== "admin") throw new Error("forbidden");
  return profile;
}

// ----------------------------------------------------------------------------
// Users
// ----------------------------------------------------------------------------

interface WithToken { token: string }

export const listUsers = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    const { data: rows, error } = await supabaseAdmin
      .from("profiles")
      .select("id, username, role, created_at")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const createUser = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken & { username: string; password: string; role: UserRole })
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    const username = data.username.trim().toLowerCase();
    if (!/^[a-z0-9_.-]{3,32}$/.test(username)) {
      throw new Error("Username must be 3–32 chars, letters/numbers/._-");
    }
    if (!data.password || data.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
    if (!["readonly", "readwrite", "admin"].includes(data.role)) {
      throw new Error("Invalid role.");
    }

    const { data: existing } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();
    if (existing) throw new Error("Username already taken.");

    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: usernameToEmail(username),
      password: data.password,
      email_confirm: true,
    });
    if (createErr || !created.user) throw new Error(createErr?.message ?? "createUser failed");

    const { error: profileErr } = await supabaseAdmin.from("profiles").insert({
      id: created.user.id,
      username,
      role: data.role,
    });
    if (profileErr) {
      await supabaseAdmin.auth.admin.deleteUser(created.user.id);
      throw new Error(profileErr.message);
    }

    return { id: created.user.id, username, role: data.role };
  });

export const changeUserRole = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken & { userId: string; role: UserRole })
  .handler(async ({ data }) => {
    const caller = await requireAdmin(data.token);
    if (caller.id === data.userId && data.role !== "admin") {
      throw new Error("You cannot demote yourself.");
    }
    if (!["readonly", "readwrite", "admin"].includes(data.role)) {
      throw new Error("Invalid role.");
    }
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: data.role })
      .eq("id", data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken & { userId: string })
  .handler(async ({ data }) => {
    const caller = await requireAdmin(data.token);
    if (caller.id === data.userId) throw new Error("You cannot delete yourself.");

    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ----------------------------------------------------------------------------
// SMTP settings
// ----------------------------------------------------------------------------

export const getSmtpSettings = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    const { data: row, error } = await supabaseAdmin
      .from("app_settings")
      .select("value")
      .eq("key", "smtp")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row?.value as SmtpSettings | undefined) ?? null;
  });

export const saveSmtpSettings = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken & Partial<SmtpSettings>)
  .handler(async ({ data }) => {
    const caller = await requireAdmin(data.token);

    const { data: current } = await supabaseAdmin
      .from("app_settings")
      .select("value")
      .eq("key", "smtp")
      .maybeSingle();
    const prev = (current?.value as SmtpSettings | undefined) ?? {
      host: "",
      port: 587,
      secure: false,
      user: "",
      pass: "",
      from: "",
      notification_to: "",
      enabled: false,
    };

    const merged: SmtpSettings = {
      host: data.host ?? prev.host,
      port: typeof data.port === "number" ? data.port : prev.port,
      secure: typeof data.secure === "boolean" ? data.secure : prev.secure,
      user: data.user ?? prev.user,
      // Keep existing password if field is blank (so admins don't retype secrets).
      pass: data.pass && data.pass.length > 0 ? data.pass : prev.pass,
      from: data.from ?? prev.from,
      notification_to: data.notification_to ?? prev.notification_to,
      enabled: typeof data.enabled === "boolean" ? data.enabled : prev.enabled,
    };

    const { error } = await supabaseAdmin
      .from("app_settings")
      .update({ value: merged, updated_by: caller.id })
      .eq("key", "smtp");
    if (error) throw new Error(error.message);

    invalidateSmtpCache();
    return { ok: true };
  });

export const sendTestEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as WithToken & { to?: string })
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    const { data: row, error } = await supabaseAdmin
      .from("app_settings")
      .select("value")
      .eq("key", "smtp")
      .maybeSingle();
    if (error) throw new Error(error.message);
    const s = row?.value as SmtpSettings | undefined;
    if (!s || !s.host || !s.from) throw new Error("SMTP is not configured.");

    const to = data.to?.trim() || s.notification_to;
    if (!to) throw new Error("No recipient — set Notification To or pass an address.");

    const transporter = nodemailer.createTransport({
      host: s.host,
      port: s.port,
      secure: s.secure,
      auth: s.user ? { user: s.user, pass: s.pass } : undefined,
    });

    try {
      await transporter.sendMail({
        from: s.from,
        to,
        subject: "[SkyFreightSquad] SMTP test",
        text:
          "This is a test message from the SkyFreightSquad admin panel.\n\n" +
          "If you received this, your SMTP configuration is working correctly.\n",
      });
      return { ok: true };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  });
