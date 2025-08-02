import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { RescueCenter } from '@/types';

export function useTopRescueCenters() {
  return useQuery({
    queryKey: ['top-rescue-centers'],
    queryFn: async (): Promise<RescueCenter[]> => {
      const { data, error } = await supabase
        .from('rescue_center_profiles')
        .select(`
          *,
          user:users(name, email, profile_image_url)
        `)
        .order('rescues_count', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching top rescue centers:', error);
        throw error;
      }

      return data?.map(center => ({
        id: center.id,
        name: center.center_name || center.user?.name || 'Unknown Center',
        image: center.logo_profile_image || center.user?.profile_image_url || 'https://via.placeholder.com/100',
        location: center.full_address || center.location || 'Unknown location',
        rescuesCount: center.rescues_count || 0,
        verified: center.verified_badge || false,
        centerType: center.center_type || 'NGO',
        contactPerson: center.contact_person_name || '',
        contactNumber: center.contact_number || '',
        whatsappNumber: center.whatsapp_number || '',
        email: center.email_address || center.user?.email || '',
        website: center.website || '',
        workingHours: center.working_hours || '',
        emergencyResponse: center.emergency_response || false,
        volunteersCount: center.volunteers_count || 0,
        animalsRescuedCount: center.animals_rescued_count || 0,
        facilities: center.facilities_available || [],
        rescueCategories: center.rescue_categories_accepted || [],
        gallery: center.gallery || [],
        socialMediaLinks: center.social_media_links || {},
        donateButtonLink: center.donate_button_link || '',
        organizationName: center.organization_name || '',
        capacity: center.capacity || '',
        services: center.services || '',
        address: center.address || '',
        coordinates: center.coordinates,
        rating: center.rating || 0,
        isOpen: center.is_open || true,
        hours: center.hours || '',
        yearsActive: center.years_active || 0,
      })) || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 