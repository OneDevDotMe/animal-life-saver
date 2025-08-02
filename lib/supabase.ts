import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate that we have the required credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  console.error('Required: EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database types (we'll generate these later)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          google_id: string | null;
          email: string;
          name: string;
          phone: string | null;
          location: string;
          bio: string | null;
          profile_image_url: string | null;
          user_type: 'saviour' | 'rescue-center' | 'both';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          google_id?: string | null;
          email: string;
          name: string;
          phone?: string | null;
          location: string;
          bio?: string | null;
          profile_image_url?: string | null;
          user_type: 'saviour' | 'rescue-center' | 'both';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          google_id?: string | null;
          email?: string;
          name?: string;
          phone?: string | null;
          location?: string;
          bio?: string | null;
          profile_image_url?: string | null;
          user_type?: 'saviour' | 'rescue-center' | 'both';
          created_at?: string;
          updated_at?: string;
        };
      };
      saviour_profiles: {
        Row: {
          id: string;
          user_id: string;
          experience_level: string | null;
          specializations: string | null;
          rescues_count: number;
          badges: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          experience_level?: string | null;
          specializations?: string | null;
          rescues_count?: number;
          badges?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          experience_level?: string | null;
          specializations?: string | null;
          rescues_count?: number;
          badges?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      rescue_center_profiles: {
        Row: {
          id: string;
          user_id: string;
          organization_name: string;
          website: string | null;
          capacity: string | null;
          services: string | null;
          address: string | null;
          coordinates: any | null;
          rating: number;
          is_open: boolean;
          hours: string | null;
          rescues_count: number;
          years_active: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          organization_name: string;
          website?: string | null;
          capacity?: string | null;
          services?: string | null;
          address?: string | null;
          coordinates?: any | null;
          rating?: number;
          is_open?: boolean;
          hours?: string | null;
          rescues_count?: number;
          years_active?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          organization_name?: string;
          website?: string | null;
          capacity?: string | null;
          services?: string | null;
          address?: string | null;
          coordinates?: any | null;
          rating?: number;
          is_open?: boolean;
          hours?: string | null;
          rescues_count?: number;
          years_active?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      rescue_stories: {
        Row: {
          id: string;
          title: string;
          story: string;
          image_url: string | null;
          before_image_url: string | null;
          after_image_url: string | null;
          location: string | null;
          date: string;
          saviour_id: string | null;
          rescue_center_id: string | null;
          animal_type: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          story: string;
          image_url?: string | null;
          before_image_url?: string | null;
          after_image_url?: string | null;
          location?: string | null;
          date: string;
          saviour_id?: string | null;
          rescue_center_id?: string | null;
          animal_type?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          story?: string;
          image_url?: string | null;
          before_image_url?: string | null;
          after_image_url?: string | null;
          location?: string | null;
          date?: string;
          saviour_id?: string | null;
          rescue_center_id?: string | null;
          animal_type?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category: string | null;
          stock_quantity: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category?: string | null;
          stock_quantity?: number;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category?: string | null;
          stock_quantity?: number;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
    };
  };
} 