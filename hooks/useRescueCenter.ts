import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RescueCenter } from "@/types";

export function useRescueCenter(id: string | undefined) {
  const fetchRescueCenter = async (): Promise<RescueCenter | null> => {
    if (!id) return null;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          rescue_center_profiles (*)
        `)
        .eq('id', id)
        .in('user_type', ['rescue-center', 'both'])
        .single();

      if (error) {
        console.error('Error fetching rescue center:', error);
        // For testing purposes, return fallback data if no rescue center found
        if (error.message.includes('No rows found')) {
          return {
            id: id,
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
            recentRescues: [
              {
                id: "r1",
                title: "Injured Golden Retriever Rescued from Highway",
                image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date: "Aug 15, 2025",
                location: "Manhattan, NY",
                status: "Completed",
                story: "Found an injured Golden Retriever on the highway. Successfully rescued and transported to veterinary care.",
                saviour: {
                  id: "s1",
                  name: "John Smith",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                  role: "Volunteer",
                  rescuesCount: 32,
                },
                rescueCenter: {
                  id: id,
                  name: "Paws & Claws Rescue",
                  image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                  location: "New York, NY",
                },
              },
            ],
          };
        }
        throw error;
      }

      if (!data) {
        throw new Error("Rescue center not found");
      }

      // Transform the data to match the RescueCenter type
      const rescueCenter: RescueCenter = {
        id: data.id,
        name: data.name,
        image: data.profile_image_url || 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        location: data.location,
        address: data.rescue_center_profiles?.[0]?.address || data.location,
        coordinates: {
          latitude: data.rescue_center_profiles?.[0]?.coordinates?.latitude || 0,
          longitude: data.rescue_center_profiles?.[0]?.coordinates?.longitude || 0,
        },
        rating: data.rescue_center_profiles?.[0]?.rating || 4.0,
        isOpen: data.rescue_center_profiles?.[0]?.is_open || true,
        hours: data.rescue_center_profiles?.[0]?.hours || '9:00 AM - 6:00 PM',
        phone: data.phone,
        email: data.email,
        website: data.rescue_center_profiles?.[0]?.website,
        description: data.bio || 'Dedicated to rescuing and caring for animals in need.',
        rescuesCount: data.rescue_center_profiles?.[0]?.rescues_count || 0,
        capacity: parseInt(data.rescue_center_profiles?.[0]?.capacity) || 50,
        yearsActive: data.rescue_center_profiles?.[0]?.years_active || 1,
        verified: false, // This field doesn't exist in the schema yet
        centerType: undefined, // This field doesn't exist in the schema yet
        registrationNumber: undefined, // This field doesn't exist in the schema yet
        contactPersonName: undefined, // This field doesn't exist in the schema yet
        whatsappNumber: undefined, // This field doesn't exist in the schema yet
        emergencyResponse: false, // This field doesn't exist in the schema yet
        volunteersCount: undefined, // This field doesn't exist in the schema yet
        facilitiesAvailable: undefined, // This field doesn't exist in the schema yet
        rescueCategoriesAccepted: undefined, // This field doesn't exist in the schema yet
        gallery: undefined, // This field doesn't exist in the schema yet
        socialMediaLinks: undefined, // This field doesn't exist in the schema yet
        donateButtonLink: undefined, // This field doesn't exist in the schema yet
        recentRescues: [], // This would need to be fetched separately
      };

      return rescueCenter;
    } catch (error) {
      console.error('Error in fetchRescueCenter:', error);
      throw error;
    }
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["rescueCenter", id],
    queryFn: fetchRescueCenter,
    enabled: !!id,
  });
  
  return {
    rescueCenter: data,
    isLoading,
    error,
  };
}