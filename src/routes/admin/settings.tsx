import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Send, Save } from "lucide-react";
import { getAccessToken } from "../../supabase/admin-client";
import { getSmtpSettings, saveSmtpSettings, sendTestEmail } from "../../server/admin";
import type { SmtpSettings } from "../../supabase/types";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

interface FormState {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notification_to: string;
  enabled: boolean;
}

const empty: FormState = {
  host: "",
  port: 587,
  secure: false,
  user: "",
  pass: "",
  from: "",
  notification_to: "",
  enabled: false,
};

function SettingsPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [testTo, setTestTo] = useState("");
  // If a password is already stored, we don't echo it back. Keep track so
  // submitting with a blank field doesn't overwrite the real one.
  const [hasStoredPassword, setHasStoredPassword] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const s = (await getSmtpSettings({ data: { token } })) as SmtpSettings | null;
      if (s) {
        setForm({ ...s, pass: "" });
        setHasStoredPassword(Boolean(s.pass));
      }
    } catch (err) {
      setStatus({ kind: "err", msg: err instanceof Error ? err.message : "Failed to load." });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const token = await getAccessToken();
      await saveSmtpSettings({ data: { token, ...form } });
      setStatus({ kind: "ok", msg: "Settings saved." });
      setForm((f) => ({ ...f, pass: "" }));
      setHasStoredPassword(hasStoredPassword || form.pass.length > 0);
    } catch (err) {
      setStatus({ kind: "err", msg: err instanceof Error ? err.message : "Save failed." });
    }
    setSaving(false);
  };

  const handleTest = async () => {
    setSending(true);
    setStatus(null);
    try {
      const token = await getAccessToken();
      await sendTestEmail({ data: { token, to: testTo || undefined } });
      setStatus({ kind: "ok", msg: `Test email sent to ${testTo || form.notification_to}.` });
    } catch (err) {
      setStatus({ kind: "err", msg: err instanceof Error ? err.message : "Test failed." });
    }
    setSending(false);
  };

  if (loading) return <p className="text-sm text-dim-gray">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-navy mb-1">SMTP settings</h1>
      <p className="text-sm text-dim-gray mb-6">
        Outgoing email configuration. Used for new-submission notifications.
      </p>

      {status && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            status.kind === "ok"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-soft-border p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-navy">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="rounded"
            />
            Enable email notifications
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Host" htmlFor="host">
            <input
              id="host"
              type="text"
              value={form.host}
              onChange={(e) => setForm({ ...form, host: e.target.value })}
              placeholder="smtp.resend.com"
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            />
          </Field>
          <Field label="Port" htmlFor="port">
            <input
              id="port"
              type="number"
              value={form.port}
              onChange={(e) => setForm({ ...form, port: Number(e.target.value) || 0 })}
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={form.secure}
            onChange={(e) => setForm({ ...form, secure: e.target.checked })}
            className="rounded"
          />
          Secure (SSL) — enable for port 465; leave off for 587 STARTTLS
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Username" htmlFor="user">
            <input
              id="user"
              type="text"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            />
          </Field>
          <Field label="Password" htmlFor="pass">
            <input
              id="pass"
              type="password"
              value={form.pass}
              onChange={(e) => setForm({ ...form, pass: e.target.value })}
              placeholder={hasStoredPassword ? "•••••• (leave blank to keep)" : ""}
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            />
          </Field>
        </div>

        <Field label="From address" htmlFor="from">
          <input
            id="from"
            type="email"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            placeholder="notifications@yourdomain.com"
            className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
          />
        </Field>

        <Field label="Notification recipient" htmlFor="notification_to">
          <input
            id="notification_to"
            type="email"
            value={form.notification_to}
            onChange={(e) => setForm({ ...form, notification_to: e.target.value })}
            placeholder="hello@skyfreightsquad.com"
            className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
          />
        </Field>
        <p className="text-xs text-dim-gray -mt-2">
          Every new form submission triggers an email to this address.
        </p>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 self-start inline-flex items-center gap-2 bg-cta text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-cta-hover disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save settings"}
        </button>
      </form>

      {/* Test email */}
      <div className="bg-white rounded-xl border border-soft-border p-6 mt-6">
        <h2 className="text-sm font-semibold text-navy mb-2">Send test email</h2>
        <p className="text-xs text-dim-gray mb-4">
          Verify your configuration. Uses the currently saved settings — not any unsaved form changes.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder={form.notification_to || "recipient@example.com"}
            className="flex-1 rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
          />
          <button
            onClick={handleTest}
            disabled={sending}
            className="inline-flex items-center gap-2 bg-skyblue text-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> {sending ? "Sending…" : "Send test"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-dim-gray mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
