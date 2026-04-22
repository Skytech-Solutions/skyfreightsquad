import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { getAccessToken } from "../../supabase/admin-client";
import { useSession } from "../../supabase/auth";
import { listUsers, createUser, changeUserRole, deleteUser } from "../../server/admin";
import type { UserRole } from "../../supabase/types";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

interface UserRow {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
}

function UsersPage() {
  const session = useSession();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const rows = await listUsers({ data: { token } });
      setUsers(rows as UserRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleRoleChange = async (userId: string, role: UserRole) => {
    setError(null);
    try {
      const token = await getAccessToken();
      await changeUserRole({ data: { token, userId, role } });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change role.");
    }
  };

  const handleDelete = async (userId: string, username: string) => {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    setError(null);
    try {
      const token = await getAccessToken();
      await deleteUser({ data: { token, userId } });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Users</h1>
          <p className="text-sm text-dim-gray">Manage admin panel accounts.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-cta text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-cta-hover transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add user
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-soft-border overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_1fr_0.6fr] gap-4 px-5 py-3 bg-offwhite border-b border-soft-border text-xs font-semibold uppercase text-dim-gray tracking-wider">
          <span>Username</span>
          <span>Role</span>
          <span>Created</span>
          <span className="text-right">Actions</span>
        </div>
        {loading ? (
          <div className="p-5 text-sm text-dim-gray">Loading…</div>
        ) : users.length === 0 ? (
          <div className="p-5 text-sm text-dim-gray">No users.</div>
        ) : (
          <ul className="divide-y divide-soft-border">
            {users.map((u) => {
              const isMe = u.id === session.user?.id;
              return (
                <li
                  key={u.id}
                  className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_0.6fr] gap-x-4 gap-y-1 px-5 py-3 items-center"
                >
                  <span className="text-sm font-semibold text-navy">
                    {u.username}{isMe && <span className="ml-2 text-xs text-dim-gray font-normal">(you)</span>}
                  </span>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                    disabled={isMe}
                    className="text-sm rounded-lg border border-soft-border bg-white px-3 py-1.5 focus:border-skyblue focus:outline-none disabled:opacity-60"
                  >
                    <option value="readonly">Read-only</option>
                    <option value="readwrite">Read-write</option>
                    <option value="admin">Admin</option>
                  </select>
                  <span className="text-sm text-dim-gray">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                  <div className="md:text-right">
                    {!isMe && (
                      <button
                        onClick={() => handleDelete(u.id, u.username)}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); load(); }}
        />
      )}
    </div>
  );
}

function CreateUserModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("readonly");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const token = await getAccessToken();
      await createUser({ data: { token, username, password, role } });
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user.");
      setSaving(false);
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    let out = "";
    const bytes = new Uint32Array(16);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
    setPassword(out);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-navy mb-4">Add user</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <div>
            <label htmlFor="new-username" className="block text-xs font-semibold text-dim-gray mb-1">
              Username
            </label>
            <input
              id="new-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            />
            <p className="text-xs text-dim-gray mt-1">Letters, numbers, dot/dash/underscore. 3–32 chars.</p>
          </div>
          <div>
            <label htmlFor="new-password" className="block text-xs font-semibold text-dim-gray mb-1">
              Password
            </label>
            <div className="flex gap-2">
              <input
                id="new-password"
                type="text"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded-lg border border-soft-border px-3 py-2 text-sm font-mono focus:border-skyblue focus:outline-none"
              />
              <button
                type="button"
                onClick={generatePassword}
                className="text-xs text-skyblue font-semibold px-3 hover:underline"
              >
                Generate
              </button>
            </div>
            <p className="text-xs text-dim-gray mt-1">Share with the user — they'll use this to sign in.</p>
          </div>
          <div>
            <label htmlFor="new-role" className="block text-xs font-semibold text-dim-gray mb-1">
              Role
            </label>
            <select
              id="new-role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-lg border border-soft-border px-3 py-2 text-sm focus:border-skyblue focus:outline-none"
            >
              <option value="readonly">Read-only</option>
              <option value="readwrite">Read-write</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-dim-gray hover:text-navy"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !username.trim() || password.length < 8}
              className="bg-cta text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-cta-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Creating…" : "Create user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
