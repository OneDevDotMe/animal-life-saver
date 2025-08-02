import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogCategory } from '@/types';

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async (): Promise<BlogCategory[]> => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
