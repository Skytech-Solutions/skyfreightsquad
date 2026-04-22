// Database types — keep in sync with supabase/01_schema.sql.
// Use `type` (not `interface`) for DB rows so they satisfy Supabase's
// Record<string, unknown> index-sig constraint.

export type UserRole = "readonly" | "readwrite" | "admin";
export type SubmissionSource = "contact" | "assessment";
export type SubmissionStatus = "new" | "in_progress" | "contacted" | "closed";

export type Profile = {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
};

export type FormSubmission = {
  id: string;
  source: SubmissionSource;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  payload: Record<string, unknown> | null;
  status: SubmissionStatus;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

export type SubmissionNote = {
  id: string;
  submission_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notification_to: string;
  enabled: boolean;
};

export type AppSetting<V = unknown> = {
  key: string;
  value: V;
  updated_at: string;
  updated_by: string | null;
};

// ---------------------------------------------------------------------------
// Database shape required by @supabase/supabase-js v2 generic typing.
// Each table needs Row/Insert/Update/Relationships; schema needs Views + Functions.
// ---------------------------------------------------------------------------
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at"> & { created_at?: string };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
        Relationships: [];
      };
      form_submissions: {
        Row: FormSubmission;
        Insert: Omit<FormSubmission, "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: SubmissionStatus;
        };
        Update: Partial<Omit<FormSubmission, "id" | "created_at">>;
        Relationships: [];
      };
      submission_notes: {
        Row: SubmissionNote;
        Insert: Omit<SubmissionNote, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Pick<SubmissionNote, "body">>;
        Relationships: [];
      };
      app_settings: {
        Row: AppSetting;
        Insert: AppSetting;
        Update: Partial<AppSetting>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      check_and_bump_rate_limit: {
        Args: { p_ip: string; p_max?: number; p_window_minutes?: number };
        Returns: boolean;
      };
      current_user_role: {
        Args: Record<string, never>;
        Returns: UserRole | null;
      };
    };
  };
};
