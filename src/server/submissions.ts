import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { supabaseAdmin } from "../supabase/server";
import { sendNotification } from "./email";
import type { SubmissionSource } from "../supabase/types";

interface SubmitInput {
  source: SubmissionSource;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  payload?: Record<string, unknown>;
}

export interface SubmitResult {
  ok: boolean;
  error?: "rate_limited" | "invalid" | "db_error";
  id?: string;
}

function validate(raw: unknown): SubmitInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (r.source !== "contact" && r.source !== "assessment") return null;

  const str = (k: string, max: number) => {
    const v = r[k];
    if (v === undefined || v === null) return undefined;
    if (typeof v !== "string") return undefined;
    return v.slice(0, max).trim() || undefined;
  };

  return {
    source: r.source,
    name: str("name", 200),
    email: str("email", 320),
    phone: str("phone", 40),
    message: str("message", 5000),
    payload:
      r.payload && typeof r.payload === "object"
        ? (r.payload as Record<string, unknown>)
        : undefined,
  };
}

function clientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? null;
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

export const submitFormEntry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<SubmitResult> => {
    const input = validate(data);
    if (!input) return { ok: false, error: "invalid" };

    const req = getRequest();
    const ip = clientIp(req);
    const ua = req.headers.get("user-agent") ?? null;

    if (ip) {
      const { data: allowed, error: rlError } = await supabaseAdmin.rpc(
        "check_and_bump_rate_limit",
        { p_ip: ip, p_max: 10, p_window_minutes: 10 },
      );
      if (rlError) {
        console.error("rate_limit_rpc_error", rlError);
      } else if (allowed === false) {
        return { ok: false, error: "rate_limited" };
      }
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("form_submissions")
      .insert({
        source: input.source,
        name: input.name ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        message: input.message ?? null,
        payload: input.payload ?? null,
        ip_address: ip,
        user_agent: ua,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("submission_insert_error", error);
      return { ok: false, error: "db_error" };
    }

    // Fire-and-forget notification. Don't block or fail the submission on mail errors.
    void sendNotification({
      subject: `[SkyFreightSquad] New ${input.source} submission`,
      text: formatNotificationText(input, inserted.id),
    }).catch((err) => console.error("notification_error", err));

    return { ok: true, id: inserted.id };
  });

function formatNotificationText(input: SubmitInput, id: string): string {
  const lines: string[] = [
    `New ${input.source} submission received.`,
    "",
    `ID:     ${id}`,
    `Source: ${input.source}`,
  ];
  if (input.name) lines.push(`Name:   ${input.name}`);
  if (input.email) lines.push(`Email:  ${input.email}`);
  if (input.phone) lines.push(`Phone:  ${input.phone}`);
  if (input.message) {
    lines.push("", "Message:", input.message);
  }
  if (input.payload) {
    lines.push("", "Payload:", JSON.stringify(input.payload, null, 2));
  }
  lines.push("", `View in admin panel: /admin/submissions/${id}`);
  return lines.join("\n");
}
