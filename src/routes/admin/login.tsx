import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signInWithUsername } from "../../supabase/auth";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setLoading(true);
    setError(null);
    const { error: authErr } = await signInWithUsername(username, password);
    setLoading(false);
    if (authErr) {
      setError("Invalid username or password.");
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-white text-2xl font-bold">
            <span className="text-cta">✦</span> SkyFreightSquad
          </h1>
          <p className="text-muted-gray text-sm mt-1">Admin Panel</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-navy-card border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
        >
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-muted-gray mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg bg-navy border border-white/10 px-4 py-3 text-sm text-white placeholder-muted-gray/60 focus:border-skyblue focus:outline-none disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-muted-gray mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg bg-navy border border-white/10 px-4 py-3 text-sm text-white placeholder-muted-gray/60 focus:border-skyblue focus:outline-none disabled:opacity-60"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cta text-white py-3 font-bold text-sm hover:bg-cta-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
