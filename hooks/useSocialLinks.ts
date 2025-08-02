import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { SocialLink } from '@/types';

export function useSocialLinks() {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: async (): Promise<SocialLink[]> => {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching social links:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
