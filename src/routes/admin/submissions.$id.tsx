import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { supabase } from "../../supabase/client";
import { useSession, roleAtLeast } from "../../supabase/auth";
import type { FormSubmission, Profile, SubmissionNote, SubmissionStatus } from "../../supabase/types";

export const Route = createFileRoute("/admin/submissions/$id")({
  component: SubmissionDetailPage,
});

type NoteWithAuthor = SubmissionNote & { author?: Pick<Profile, "username"> | null };

const statusOptions: { value: SubmissionStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

function SubmissionDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const session = useSession();
  const canWrite = roleAtLeast(session.profile?.role, "readwrite");
  const canDelete = roleAtLeast(session.profile?.role, "admin");

  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [notes, setNotes] = useState<NoteWithAuthor[]>([]);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [sub, rawNotes] = await Promise.all([
      supabase.from("form_submissions").select("*").eq("id", id).single(),
      supabase
        .from("submission_notes")
        .select("id,submission_id,author_id,body,created_at")
        .eq("submission_id", id)
        .order("created_at", { ascending: true }),
    ]);
    if (sub.data) setSubmission(sub.data as FormSubmission);

    const noteRows = (rawNotes.data ?? []) as SubmissionNote[];
    const authorIds = Array.from(new Set(noteRows.map((n) => n.author_id)));
    let authors: Record<string, Pick<Profile, "username">> = {};
    if (authorIds.length > 0) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("id,username")
        .in("id", authorIds);
      authors = Object.fromEntries(
        ((profs ?? []) as Array<Pick<Profile, "id" | "username">>).map((p) => [p.id, { username: p.username }]),
      );
    }
    setNotes(noteRows.map((n) => ({ ...n, author: authors[n.author_id] ?? null })));
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (next: SubmissionStatus) => {
    if (!submission) return;
    const prev = submission.status;
    setSubmission({ ...submission, status: next });
    const { error: err } = await supabase
      .from("form_submissions")
      .update({ status: next })
      .eq("id", submission.id);
    if (err) {
      setSubmission({ ...submission, status: prev });
      setError("Failed to update status.");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !session.user) return;
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from("submission_notes").insert({
      submission_id: id,
      author_id: session.user.id,
      body: newNote.trim(),
    });
    setSaving(false);
    if (err) {
      setError("Failed to add note.");
      return;
    }
    setNewNote("");
    load();
  };

  const handleDelete = async () => {
    if (!submission) return;
    if (!confirm("Delete this submission permanently? This cannot be undone.")) return;
    const { error: err } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", submission.id);
    if (err) {
      setError("Failed to delete.");
      return;
    }
    navigate({ to: "/admin/submissions" });
  };

  if (loading) return <p className="text-sm text-dim-gray">Loading…</p>;
  if (!submission) return <p className="text-sm text-dim-gray">Submission not found.</p>;

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate({ to: "/admin/submissions" })}
        className="flex items-center gap-2 text-sm text-dim-gray hover:text-navy mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to submissions
      </button>

      <div className="bg-white rounded-xl border border-soft-border p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-navy">{submission.name ?? "Anonymous"}</h1>
            <p className="text-sm text-dim-gray mt-0.5">
              {submission.email ?? "No email"} · {submission.source} ·{" "}
              {new Date(submission.created_at).toLocaleString()}
            </p>
          </div>
          {canDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold text-dim-gray uppercase">Status</span>
          <select
            value={submission.status}
            onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus)}
            disabled={!canWrite}
            className="text-sm rounded-lg border border-soft-border bg-white px-3 py-1.5 focus:border-skyblue focus:outline-none disabled:opacity-60"
          >
            {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="border-t border-soft-border pt-5 space-y-4 text-sm">
          {submission.phone && (
            <Field label="Phone" value={submission.phone} />
          )}
          {submission.message && (
            <Field label="Message" value={submission.message} pre />
          )}
          {submission.payload && Object.keys(submission.payload).length > 0 && (
            <Field label="Payload" value={JSON.stringify(submission.payload, null, 2)} pre />
          )}
          {submission.ip_address && (
            <Field label="IP" value={submission.ip_address} />
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-soft-border p-6 mt-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Notes</h2>
        {notes.length === 0 ? (
          <p className="text-sm text-dim-gray">No notes yet.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {notes.map((n) => (
              <li key={n.id} className="bg-offwhite rounded-lg p-3">
                <p className="text-xs text-dim-gray mb-1">
                  <span className="font-semibold text-navy">{n.author?.username ?? "unknown"}</span>{" "}
                  · {new Date(n.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-navy whitespace-pre-wrap">{n.body}</p>
              </li>
            ))}
          </ul>
        )}

        {canWrite ? (
          <form onSubmit={handleAddNote} className="flex flex-col gap-2">
            <textarea
              rows={3}
              placeholder="Add a note…"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              disabled={saving}
              className="rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none resize-none disabled:opacity-60"
            />
            <div className="flex items-center justify-between">
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={saving || !newNote.trim()}
                className="ml-auto rounded-full bg-cta text-white px-5 py-2 text-sm font-semibold hover:bg-cta-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Add note"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-xs text-dim-gray mt-3">Read-only — you don't have permission to add notes.</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, pre }: { label: string; value: string; pre?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-dim-gray uppercase tracking-wider mb-1">{label}</p>
      {pre ? (
        <pre className="bg-offwhite rounded-lg p-3 text-xs text-navy whitespace-pre-wrap font-mono">{value}</pre>
      ) : (
        <p className="text-sm text-navy">{value}</p>
      )}
    </div>
  );
}
