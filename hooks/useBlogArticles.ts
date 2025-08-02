import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BlogArticle } from '@/types';

export function useBlogArticles() {
  return useQuery({
    queryKey: ['blog-articles'],
    queryFn: async (): Promise<BlogArticle[]> => {
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          *,
          category:blog_categories(*)
        `)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog articles:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
