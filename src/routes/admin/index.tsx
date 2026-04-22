import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Inbox, Clock, Phone, CheckCircle2 } from "lucide-react";
import { supabase } from "../../supabase/client";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

interface Counts {
  total: number;
  new: number;
  in_progress: number;
  contacted: number;
  closed: number;
}

const emptyCounts: Counts = { total: 0, new: 0, in_progress: 0, contacted: 0, closed: 0 };

function DashboardPage() {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState<Array<{ id: string; source: string; name: string | null; email: string | null; created_at: string; status: string }>>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ data: all }, { data: recentRows }] = await Promise.all([
        supabase.from("form_submissions").select("status"),
        supabase.from("form_submissions").select("id,source,name,email,created_at,status").order("created_at", { ascending: false }).limit(5),
      ]);
      if (cancelled) return;
      const next: Counts = { ...emptyCounts };
      (all ?? []).forEach((r) => {
        next.total += 1;
        const s = r.status as keyof Counts;
        if (s in next && s !== "total") next[s] = (next[s] as number) + 1;
      });
      setCounts(next);
      setRecent((recentRows ?? []) as typeof recent);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const tiles = [
    { label: "Total submissions", value: counts.total, icon: Inbox, color: "text-skyblue" },
    { label: "New", value: counts.new, icon: Clock, color: "text-cta" },
    { label: "Contacted", value: counts.contacted, icon: Phone, color: "text-skyblue" },
    { label: "Closed", value: counts.closed, icon: CheckCircle2, color: "text-green-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">Dashboard</h1>
      <p className="text-sm text-dim-gray mb-6">Overview of form submissions.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="bg-white rounded-xl border border-soft-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-dim-gray font-medium uppercase tracking-wider">{t.label}</p>
                <Icon className={`w-4 h-4 ${t.color}`} />
              </div>
              <p className="text-2xl font-bold text-navy mt-2">
                {loading ? "—" : t.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-soft-border">
        <div className="flex items-center justify-between px-5 py-4 border-b border-soft-border">
          <h2 className="text-sm font-semibold text-navy">Recent submissions</h2>
          <Link to="/admin/submissions" className="text-xs text-skyblue font-medium hover:underline">
            View all →
          </Link>
        </div>
        {loading ? (
          <div className="p-5 text-sm text-dim-gray">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="p-5 text-sm text-dim-gray">No submissions yet.</div>
        ) : (
          <ul className="divide-y divide-soft-border">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  to="/admin/submissions/$id"
                  params={{ id: r.id }}
                  className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-offwhite"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy truncate">{r.name ?? "Anonymous"}</p>
                    <p className="text-xs text-dim-gray truncate">{r.email ?? "—"} · {r.source}</p>
                  </div>
                  <span className="text-xs text-dim-gray shrink-0">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
