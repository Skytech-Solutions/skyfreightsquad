import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./client";
import type { Profile, UserRole } from "./types";

const EMAIL_SUFFIX = "@internal.skyfreightsquad";

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}${EMAIL_SUFFIX}`;
}

export function emailToUsername(email: string): string {
  return email.replace(EMAIL_SUFFIX, "");
}

export async function signInWithUsername(username: string, password: string) {
  return supabase.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export type SessionState =
  | { status: "loading"; user: null; profile: null }
  | { status: "signed-out"; user: null; profile: null }
  | { status: "signed-in"; user: User; profile: Profile | null };

/**
 * Subscribes to Supabase auth changes and fetches the linked profile row.
 * Returns loading, signed-out, or signed-in with profile (may be null if the
 * profile hasn't been attached — usually means an orphaned auth.users row).
 */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    status: "loading",
    user: null,
    profile: null,
  });

  useEffect(() => {
    let cancelled = false;

    const apply = async (session: Session | null) => {
      if (cancelled) return;
      if (!session?.user) {
        setState({ status: "signed-out", user: null, profile: null });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      setState({
        status: "signed-in",
        user: session.user,
        profile: (profile as Profile | null) ?? null,
      });
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export function roleAtLeast(current: UserRole | null | undefined, required: UserRole): boolean {
  if (!current) return false;
  const order: Record<UserRole, number> = { readonly: 1, readwrite: 2, admin: 3 };
  return order[current] >= order[required];
}
