import { useState, useEffect } from 'react';
import { RescueCenter } from '@/types';
import { supabase } from '@/lib/supabase';

export function useRescueCenters(searchQuery: string = "", locationFilter: string = "") {
  const [rescueCenters, setRescueCenters] = useState<RescueCenter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRescueCenters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let supabaseQuery = supabase
        .from('users')
        .select(`
          *,
          rescue_center_profiles (*)
        `)
        .in('user_type', ['rescue-center', 'both'])
        .order('created_at', { ascending: false });

      if (searchQuery) {
        supabaseQuery = supabaseQuery.or(`name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      if (locationFilter) {
        supabaseQuery = supabaseQuery.ilike('location', `%${locationFilter}%`);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      let formattedRescueCenters: RescueCenter[] = data?.map(user => {
        const profile = user.rescue_center_profiles?.[0];
        return {
          id: user.id,
          name: profile?.center_name || user.name,
          image: profile?.logo_profile_image || user.profile_image_url || 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          location: profile?.service_area || user.location,
          address: profile?.full_address || user.location,
          coordinates: {
            latitude: profile?.coordinates?.[0] || 0,
            longitude: profile?.coordinates?.[1] || 0,
          },
          rating: profile?.rating || 5.0,
          isOpen: profile?.is_open || true,
          hours: profile?.working_hours || profile?.hours || '24/7 Emergency',
          phone: profile?.contact_number || user.phone || '',
          email: profile?.email_address || user.email,
          website: profile?.website,
          description: profile?.services || user.bio || 'Dedicated to helping animals in need.',
          rescuesCount: profile?.animals_rescued_count || profile?.rescues_count || 0,
          capacity: profile?.capacity ? parseInt(profile.capacity) : 50,
          yearsActive: profile?.years_active || 1,
          recentRescues: [],
          // Additional comprehensive fields
          verified: user.verified,
          centerType: profile?.center_type,
          registrationNumber: profile?.registration_number,
          contactPersonName: profile?.contact_person_name,
          whatsappNumber: profile?.whatsapp_number,
          emergencyResponse: profile?.emergency_response,
          volunteersCount: profile?.volunteers_count,
          facilitiesAvailable: profile?.facilities_available,
          rescueCategoriesAccepted: profile?.rescue_categories_accepted,
          gallery: profile?.gallery,
          socialMediaLinks: profile?.social_media_links,
          donateButtonLink: profile?.donate_button_link
        };
      }) || [];

      // If no rescue centers found, provide sample data for testing
      if (formattedRescueCenters.length === 0) {
        formattedRescueCenters = [
          {
            id: "rc1",
            name: "Paws & Claws Rescue",
            image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "New York, NY",
            address: "123 Rescue Lane, New York, NY 10001",
            coordinates: {
              latitude: 40.7128,
              longitude: -74.006,
            },
            rating: 4.8,
            isOpen: true,
            hours: "9:00 AM - 6:00 PM",
            phone: "+1 (212) 555-1234",
            email: "info@pawsandclaws.org",
            website: "www.pawsandclaws.org",
            description: "Paws & Claws Rescue is a non-profit organization dedicated to rescuing and rehabilitating injured and abandoned animals. We provide medical care, shelter, and love to animals in need until they find their forever homes.",
            rescuesCount: 243,
            capacity: 50,
            yearsActive: 8,
            verified: true,
            centerType: "Non-profit",
            registrationNumber: "NY-12345",
            contactPersonName: "Sarah Johnson",
            whatsappNumber: "+1 (212) 555-5678",
            emergencyResponse: true,
            volunteersCount: 25,
            facilitiesAvailable: ["Medical Clinic", "Rehabilitation Center", "Adoption Center"],
            rescueCategoriesAccepted: ["Dogs", "Cats", "Wildlife"],
            gallery: [
              "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            ],
            socialMediaLinks: {
              instagram: "https://instagram.com/pawsandclaws",
              facebook: "https://facebook.com/pawsandclawsrescue",
              youtube: "https://youtube.com/@pawsandclaws",
            },
            donateButtonLink: "https://donate.pawsandclaws.org",
            recentRescues: [],
          },
          {
            id: "rc2",
            name: "Wildlife Haven",
            image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Los Angeles, CA",
            address: "456 Wildlife Drive, Los Angeles, CA 90001",
            coordinates: {
              latitude: 34.0522,
              longitude: -118.2437,
            },
            rating: 4.5,
            isOpen: true,
            hours: "8:00 AM - 7:00 PM",
            phone: "+1 (323) 555-6789",
            email: "contact@wildlifehaven.org",
            website: "www.wildlifehaven.org",
            description: "Wildlife Haven specializes in rescuing and rehabilitating wild animals. Our team of experts provides medical care and rehabilitation services to injured wildlife with the goal of releasing them back into their natural habitats.",
            rescuesCount: 187,
            capacity: 75,
            yearsActive: 12,
            verified: true,
            centerType: "Wildlife Sanctuary",
            registrationNumber: "CA-67890",
            contactPersonName: "Michael Rodriguez",
            whatsappNumber: "+1 (323) 555-7890",
            emergencyResponse: true,
            volunteersCount: 15,
            facilitiesAvailable: ["Wildlife Hospital", "Rehabilitation Pools", "Flight Cages"],
            rescueCategoriesAccepted: ["Birds", "Mammals", "Reptiles"],
            gallery: [
              "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            ],
            socialMediaLinks: {
              instagram: "https://instagram.com/wildlifehaven",
              facebook: "https://facebook.com/wildlifehaven",
              youtube: "https://youtube.com/@wildlifehaven",
            },
            donateButtonLink: "https://donate.wildlifehaven.org",
            recentRescues: [],
          },
        ];
      }

      setRescueCenters(formattedRescueCenters);
    } catch (err) {
      console.error('Error fetching rescue centers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch rescue centers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRescueCenters();
  }, [searchQuery, locationFilter]);

  return { rescueCenters, isLoading, error, refetch: fetchRescueCenters };
}