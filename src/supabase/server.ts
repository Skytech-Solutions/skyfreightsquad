import "@tanstack/react-start/server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the server environment.",
  );
}

export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
