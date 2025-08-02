import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  google_id?: string;
  email: string;
  name: string;
  phone?: string;
  location: string;
  bio?: string;
  profile_image_url?: string;
  user_type: 'saviour' | 'rescue-center' | 'both';
  verified: boolean;
  experience?: string;
  specializations?: string;
  organizationName?: string;
  website?: string;
  capacity?: string;
  services?: string;
  created_at: string;
  updated_at: string;
}

class DataService {
  // User profile methods
  async createUserProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([profile])
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async getUserByGoogleId(googleId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('google_id', googleId)
        .single();

      if (error) {
        console.error('Error fetching user by Google ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user by Google ID:', error);
      return null;
    }
  }

  // Saviour profile methods
  async createSaviourProfile(saviourData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('saviour_profiles')
        .insert([saviourData])
        .select()
        .single();

      if (error) {
        console.error('Error creating saviour profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating saviour profile:', error);
      return null;
    }
  }

  async updateSaviourProfile(profileId: string, updates: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('saviour_profiles')
        .update(updates)
        .eq('id', profileId)
        .select()
        .single();

      if (error) {
        console.error('Error updating saviour profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating saviour profile:', error);
      return null;
    }
  }

  // Rescue center profile methods
  async createRescueCenterProfile(rescueCenterData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('rescue_center_profiles')
        .insert([rescueCenterData])
        .select()
        .single();

      if (error) {
        console.error('Error creating rescue center profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating rescue center profile:', error);
      return null;
    }
  }

  async updateRescueCenterProfile(profileId: string, updates: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('rescue_center_profiles')
        .update(updates)
        .eq('id', profileId)
        .select()
        .single();

      if (error) {
        console.error('Error updating rescue center profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating rescue center profile:', error);
      return null;
    }
  }

  // File upload methods
  async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading profile image:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return null;
    }
  }

  // Generic data methods
  async getData(table: string, filters?: any): Promise<any[]> {
    try {
      let query = supabase.from(table).select('*');
      
      if (filters) {
        Object.keys(filters).forEach(key => {
          query = query.eq(key, filters[key]);
        });
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching data from ${table}:`, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      return [];
    }
  }

  async insertData(table: string, data: any): Promise<any> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error(`Error inserting data into ${table}:`, error);
        return null;
      }

      return result;
    } catch (error) {
      console.error(`Error inserting data into ${table}:`, error);
      return null;
    }
  }

  async updateData(table: string, id: string, updates: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating data in ${table}:`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error updating data in ${table}:`, error);
      return null;
    }
  }

  async deleteData(table: string, id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting data from ${table}:`, error);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error deleting data from ${table}:`, error);
      return false;
    }
  }
}

export default new DataService(); 