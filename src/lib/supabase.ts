

import { createClient } from '@supabase/supabase-js'

// Log the environment variables for debugging
console.log('Environment check:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
  NODE_ENV: import.meta.env.MODE
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing:', {
    url: supabaseUrl ? 'Present' : 'Missing',
    key: supabaseAnonKey ? 'Present' : 'Missing'
  });
  
  // Create a mock client for development to prevent the app from crashing
  console.warn('Creating mock Supabase client - features will not work until proper configuration is set');
  
  export const supabase = createClient(
    'https://placeholder.supabase.co', 
    'placeholder-key'
  );
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Database types
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          website: string | null
          industry: string | null
          size: string | null
          location: string | null
          description: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          website?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
        }
        Update: {
          name?: string
          website?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
        }
      }
      contacts: {
        Row: {
          id: string
          company_id: string | null
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          title: string | null
          contact_type: 'client' | 'partner' | 'vendor' | 'internal'
          linkedin_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          title?: string | null
          contact_type?: 'client' | 'partner' | 'vendor' | 'internal'
          linkedin_url?: string | null
          notes?: string | null
        }
        Update: {
          company_id?: string | null
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          title?: string | null
          contact_type?: 'client' | 'partner' | 'vendor' | 'internal'
          linkedin_url?: string | null
          notes?: string | null
        }
      }
      candidates: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          title: string | null
          location: string | null
          status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
          skills: string[] | null
          experience_years: number | null
          salary_expectation_min: number | null
          salary_expectation_max: number | null
          resume_url: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          availability_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          title?: string | null
          location?: string | null
          status?: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
          skills?: string[] | null
          experience_years?: number | null
          salary_expectation_min?: number | null
          salary_expectation_max?: number | null
          resume_url?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          availability_date?: string | null
          notes?: string | null
        }
        Update: {
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          title?: string | null
          location?: string | null
          status?: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
          skills?: string[] | null
          experience_years?: number | null
          salary_expectation_min?: number | null
          salary_expectation_max?: number | null
          resume_url?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          availability_date?: string | null
          notes?: string | null
        }
      }
      notes: {
        Row: {
          id: string
          entity_type: 'candidate' | 'contact' | 'company' | 'job' | 'project'
          entity_id: string
          content: string
          priority: 'low' | 'medium' | 'high'
          tags: string[] | null
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          entity_type: 'candidate' | 'contact' | 'company' | 'job' | 'project'
          entity_id: string
          content: string
          priority?: 'low' | 'medium' | 'high'
          tags?: string[] | null
          author_id: string
        }
        Update: {
          entity_type?: 'candidate' | 'contact' | 'company' | 'job' | 'project'
          entity_id?: string
          content?: string
          priority?: 'low' | 'medium' | 'high'
          tags?: string[] | null
        }
      }
    }
  }
}

