import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "../../supabase/auth";
import { AdminShell } from "../../components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — SkyFreightSquad" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginRoute = location.pathname === "/admin/login";

  useEffect(() => {
    if (session.status === "signed-out" && !isLoginRoute) {
      navigate({ to: "/admin/login" });
    } else if (session.status === "signed-in" && isLoginRoute) {
      navigate({ to: "/admin" });
    }
  }, [session.status, isLoginRoute, navigate]);

  if (isLoginRoute) {
    return <Outlet />;
  }

  if (session.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <p className="text-sm text-dim-gray">Loading…</p>
      </div>
    );
  }

  if (session.status === "signed-out" || !session.profile) {
    return null; // effect above redirects
  }

  return (
    <AdminShell profile={session.profile}>
      <Outlet />
    </AdminShell>
  );
}
