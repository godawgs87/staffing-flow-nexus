export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          availability_date: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          location: string | null
          notes: string | null
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          salary_expectation_max: number | null
          salary_expectation_min: number | null
          skills: string[] | null
          status: Database["public"]["Enums"]["candidate_status"] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          availability_date?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          availability_date?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          name: string
          size: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          size?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          size?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          contact_type: Database["public"]["Enums"]["contact_type"] | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          contact_type?: Database["public"]["Enums"]["contact_type"] | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          contact_type?: Database["public"]["Enums"]["contact_type"] | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string | null
          candidate_id: string | null
          id: string
          job_id: string | null
          notes: string | null
          status: string | null
        }
        Insert: {
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
        }
        Update: {
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          job_type: string | null
          location: string | null
          priority: string | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          priority?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          priority?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          priority: Database["public"]["Enums"]["note_priority"] | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id?: string
          priority?: Database["public"]["Enums"]["note_priority"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type"]
          id?: string
          priority?: Database["public"]["Enums"]["note_priority"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          invited_at: string | null
          last_login: string | null
          last_name: string | null
          role: string | null
          status: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          invited_at?: string | null
          last_login?: string | null
          last_name?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          invited_at?: string | null
          last_login?: string | null
          last_name?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          email: string
          expires_at: string
          id: string
          invited_at: string
          invited_by: string | null
          role: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          email: string
          expires_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_team_members: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: string
          status: string
          last_login: string
          invited_at: string
        }[]
      }
      invite_team_member: {
        Args: { invite_email: string; invite_role?: string }
        Returns: string
      }
    }
    Enums: {
      candidate_status:
        | "new"
        | "screening"
        | "interview"
        | "offer"
        | "hired"
        | "rejected"
      contact_type: "client" | "partner" | "vendor" | "internal"
      entity_type: "candidate" | "contact" | "company" | "job" | "project"
      job_status: "draft" | "open" | "paused" | "filled" | "cancelled"
      note_priority: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      candidate_status: [
        "new",
        "screening",
        "interview",
        "offer",
        "hired",
        "rejected",
      ],
      contact_type: ["client", "partner", "vendor", "internal"],
      entity_type: ["candidate", "contact", "company", "job", "project"],
      job_status: ["draft", "open", "paused", "filled", "cancelled"],
      note_priority: ["low", "medium", "high"],
    },
  },
} as const
