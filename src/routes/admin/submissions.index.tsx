import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search as SearchIcon } from "lucide-react";
import { supabase } from "../../supabase/client";
import type { FormSubmission, SubmissionSource, SubmissionStatus } from "../../supabase/types";

type SourceFilter = "all" | SubmissionSource;
type StatusFilter = "all" | SubmissionStatus;

interface RouteSearch {
  page?: number;
  source?: SourceFilter;
  status?: StatusFilter;
  q?: string;
}

export const Route = createFileRoute("/admin/submissions/")({
  component: SubmissionsListPage,
  validateSearch: (s: Record<string, unknown>): RouteSearch => ({
    page: typeof s.page === "number" && s.page > 0 ? s.page : undefined,
    source: s.source === "contact" || s.source === "assessment" ? s.source : undefined,
    status:
      s.status === "new" || s.status === "in_progress" || s.status === "contacted" || s.status === "closed"
        ? s.status
        : undefined,
    q: typeof s.q === "string" && s.q.length > 0 ? s.q : undefined,
  }),
});

const PAGE_SIZE = 20;

const statusTone: Record<SubmissionStatus, string> = {
  new: "bg-cta/10 text-cta",
  in_progress: "bg-skyblue/10 text-skyblue",
  contacted: "bg-indigo-100 text-indigo-700",
  closed: "bg-green-100 text-green-700",
};

function SubmissionsListPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const page = search.page ?? 1;
  const source: SourceFilter = search.source ?? "all";
  const status: StatusFilter = search.status ?? "all";
  const query = search.q ?? "";

  const [rows, setRows] = useState<FormSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState(query);

  const updateSearch = (patch: Partial<RouteSearch>) => {
    navigate({
      to: "/admin/submissions",
      search: (prev) => {
        const next: RouteSearch = { ...prev, ...patch };
        // Strip defaults so URL stays tidy
        if (!next.page || next.page === 1) delete next.page;
        if (!next.source || next.source === "all") delete next.source;
        if (!next.status || next.status === "all") delete next.status;
        if (!next.q) delete next.q;
        return next;
      },
    });
  };

  // Debounced search input → URL
  useEffect(() => {
    const id = setTimeout(() => {
      if (queryInput !== query) {
        updateSearch({ q: queryInput || undefined, page: 1 });
      }
    }, 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let builder = supabase
        .from("form_submissions")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (source !== "all") builder = builder.eq("source", source);
      if (status !== "all") builder = builder.eq("status", status);
      if (query.trim()) {
        const q = query.trim().replace(/[%,]/g, "");
        builder = builder.or(`name.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%`);
      }

      const { data, count } = await builder;
      if (cancelled) return;
      setRows((data ?? []) as FormSubmission[]);
      setTotal(count ?? 0);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [page, source, status, query]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeFrom = useMemo(() => (total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1), [total, page]);
  const rangeTo = useMemo(() => Math.min(page * PAGE_SIZE, total), [page, total]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">Submissions</h1>
      <p className="text-sm text-dim-gray mb-6">
        {loading ? "Loading…" : `${total} total · showing ${rangeFrom}–${rangeTo}`}
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dim-gray" />
          <input
            type="text"
            placeholder="Search name, email, message"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-lg border border-soft-border bg-white focus:border-skyblue focus:outline-none w-72"
          />
        </div>
        <select
          value={source}
          onChange={(e) => updateSearch({ source: e.target.value as SourceFilter, page: 1 })}
          className="py-2 px-3 text-sm rounded-lg border border-soft-border bg-white focus:border-skyblue focus:outline-none"
        >
          <option value="all">All sources</option>
          <option value="contact">Contact</option>
          <option value="assessment">Assessment</option>
        </select>
        <select
          value={status}
          onChange={(e) => updateSearch({ status: e.target.value as StatusFilter, page: 1 })}
          className="py-2 px-3 text-sm rounded-lg border border-soft-border bg-white focus:border-skyblue focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-soft-border overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_1.8fr_1fr_0.8fr_1fr] gap-4 px-5 py-3 bg-offwhite border-b border-soft-border text-xs font-semibold uppercase text-dim-gray tracking-wider">
          <span>Name</span>
          <span>Email</span>
          <span>Source</span>
          <span>Status</span>
          <span>Received</span>
        </div>
        {loading ? (
          <div className="p-8 text-sm text-dim-gray">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-sm text-dim-gray">No submissions match.</div>
        ) : (
          <ul className="divide-y divide-soft-border">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  to="/admin/submissions/$id"
                  params={{ id: r.id }}
                  className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr_1fr_0.8fr_1fr] gap-x-4 gap-y-1 px-5 py-3 hover:bg-offwhite transition-colors"
                >
                  <span className="text-sm font-semibold text-navy truncate">{r.name ?? "Anonymous"}</span>
                  <span className="text-sm text-dim-gray truncate">{r.email ?? "—"}</span>
                  <span className="text-sm text-dim-gray capitalize">{r.source}</span>
                  <span>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${statusTone[r.status]}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </span>
                  <span className="text-sm text-dim-gray">
                    {new Date(r.created_at).toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-dim-gray">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => updateSearch({ page: Math.max(1, page - 1) })}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 text-sm border border-soft-border bg-white rounded-lg px-3 py-1.5 hover:bg-offwhite disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => updateSearch({ page: Math.min(totalPages, page + 1) })}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 text-sm border border-soft-border bg-white rounded-lg px-3 py-1.5 hover:bg-offwhite disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
