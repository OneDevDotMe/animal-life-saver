import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ProductCategory } from '@/types';

export function useProductCategories() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: async (): Promise<ProductCategory[]> => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('name');

      if (error) {
        console.error('Error fetching product categories:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 