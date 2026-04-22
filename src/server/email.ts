import "@tanstack/react-start/server-only";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "../supabase/server";
import type { SmtpSettings } from "../supabase/types";

let cached: { settings: SmtpSettings; fetchedAt: number } | null = null;
const CACHE_MS = 60_000;

async function loadSmtpSettings(): Promise<SmtpSettings | null> {
  if (cached && Date.now() - cached.fetchedAt < CACHE_MS) {
    return cached.settings;
  }

  const { data, error } = await supabaseAdmin
    .from("app_settings")
    .select("value")
    .eq("key", "smtp")
    .single();

  if (error || !data) return null;

  const settings = data.value as SmtpSettings;
  cached = { settings, fetchedAt: Date.now() };
  return settings;
}

export function invalidateSmtpCache() {
  cached = null;
}

export interface SendOptions {
  subject: string;
  text: string;
  html?: string;
  /** Override the DB-configured notification_to for this send. */
  to?: string;
}

export interface SendResult {
  ok: boolean;
  skipped?: "disabled" | "unconfigured";
  error?: string;
}

export async function sendNotification(opts: SendOptions): Promise<SendResult> {
  const settings = await loadSmtpSettings();
  if (!settings) return { ok: false, skipped: "unconfigured" };
  if (!settings.enabled) return { ok: false, skipped: "disabled" };
  if (!settings.host || !settings.from) return { ok: false, skipped: "unconfigured" };

  const to = opts.to ?? settings.notification_to;
  if (!to) return { ok: false, skipped: "unconfigured" };

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.user
      ? { user: settings.user, pass: settings.pass }
      : undefined,
  });

  try {
    await transporter.sendMail({
      from: settings.from,
      to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
