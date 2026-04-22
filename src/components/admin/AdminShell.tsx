import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, LayoutDashboard, Inbox, Users, Settings as SettingsIcon } from "lucide-react";
import { signOut } from "../../supabase/auth";
import type { Profile } from "../../supabase/types";
import { roleAtLeast } from "../../supabase/auth";

interface Props {
  profile: Profile;
  children: React.ReactNode;
}

const nav = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, minRole: "readonly" as const },
  { to: "/admin/submissions" as const, label: "Submissions", icon: Inbox, minRole: "readonly" as const },
  { to: "/admin/users" as const, label: "Users", icon: Users, minRole: "admin" as const },
  { to: "/admin/settings" as const, label: "Settings", icon: SettingsIcon, minRole: "admin" as const },
];

export function AdminShell({ profile, children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/admin/login" });
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const visibleNav = nav.filter((n) => roleAtLeast(profile.role, n.minRole));

  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-navy text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2 text-white font-bold">
            <span className="text-cta">✦</span> SkyFreightSquad
          </Link>
          <p className="text-xs text-muted-gray mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {visibleNav.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-muted-gray hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-sm text-white font-semibold">{profile.username}</p>
          <p className="text-xs text-muted-gray capitalize">{profile.role}</p>
          <button
            onClick={handleSignOut}
            className="mt-3 flex items-center gap-2 text-xs text-muted-gray hover:text-white"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-navy text-white flex items-center justify-between px-4 py-3 border-b border-white/10">
        <Link to="/admin" className="font-bold text-sm"><span className="text-cta">✦</span> Admin</Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-gray">{profile.username}</span>
          <button onClick={handleSignOut} aria-label="Sign out"><LogOut className="w-4 h-4" /></button>
        </div>
      </div>

      <main className="flex-1 md:ml-0 pt-14 md:pt-0">
        {/* Mobile nav tabs */}
        <nav className="md:hidden flex overflow-x-auto border-b border-soft-border bg-white px-2">
          {visibleNav.map((n) => {
            const active = isActive(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`shrink-0 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 ${
                  active ? "border-cta text-navy" : "border-transparent text-dim-gray"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
