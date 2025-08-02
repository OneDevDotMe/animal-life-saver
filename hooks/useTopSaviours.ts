import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Saviour } from '@/types';

export function useTopSaviours() {
  return useQuery({
    queryKey: ['top-saviours'],
    queryFn: async (): Promise<Saviour[]> => {
      const { data, error } = await supabase
        .from('saviour_profiles')
        .select(`
          *,
          user:users(name, email, profile_image_url)
        `)
        .order('rescues_submitted_count', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching top saviours:', error);
        throw error;
      }

      return data?.map(saviour => ({
        id: saviour.id,
        name: saviour.full_name || saviour.user?.name || 'Unknown',
        image: saviour.profile_picture || saviour.user?.profile_image_url || 'https://via.placeholder.com/100',
        location: saviour.location_area || 'Unknown location',
        rescuesCount: saviour.rescues_submitted_count || 0,
        verified: saviour.verified_badge || false,
        experience: saviour.experience_level || 'Beginner',
        specializations: saviour.specializations || '',
        bio: saviour.short_bio || '',
        contactNumber: saviour.contact_number || '',
        email: saviour.email_address || saviour.user?.email || '',
        mostRecentActivity: saviour.most_recent_activity,
        badges: saviour.badges || [],
        socialLinks: saviour.social_links || {},
      })) || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 