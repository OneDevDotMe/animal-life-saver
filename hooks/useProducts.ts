import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

interface UseProductsOptions {
  categoryId?: string;
  isFeatured?: boolean;
  limit?: number;
  search?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { categoryId, isFeatured, limit, search } = options;

  return useQuery({
    queryKey: ['products', options],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:product_categories(*)
        `)
        .eq('is_active', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (isFeatured !== undefined) {
        query = query.eq('is_featured', isFeatured);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,short_description.ilike.%${search}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 