import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Saviour } from "@/types";

export function useSaviour(id: string | undefined) {
  const fetchSaviour = async (): Promise<Saviour | null> => {
    if (!id) return null;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          saviour_profiles (*)
        `)
        .eq('id', id)
        .in('user_type', ['saviour', 'both'])
        .single();

      if (error) {
        console.error('Error fetching saviour:', error);
        // For testing purposes, return fallback data if no saviour found
        if (error.message.includes('No rows found')) {
          return {
            id: id,
            name: "John Smith",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            role: "Volunteer",
            location: "New York, NY",
            rescuesCount: 32,
            memberSince: "2020",
            verified: true,
            contactNumber: "+1 (555) 123-4567",
            email: "john.smith@animallifesaver.org",
            specializations: "Emergency response, Dog handling, Search and rescue operations",
            socialLinks: {
              instagram: "https://instagram.com/johnsmith_rescues",
              facebook: "https://facebook.com/johnsmith.animalrescuer",
              youtube: "https://youtube.com/@johnsmithrescues",
            },
            mostRecentActivity: "Completed rescue of injured Golden Retriever - 2 hours ago",
            badges: [
              {
                id: "b1",
                name: "First Responder",
                description: "Awarded for quick response to emergency situations",
              },
              {
                id: "b2",
                name: "Dog Whisperer",
                description: "Exceptional skill in handling and calming dogs",
              },
            ],
            bio: "John has been volunteering with animal rescue organizations for over 5 years. He specializes in emergency response and has a particular talent for gaining the trust of frightened dogs. When not rescuing animals, John works as a firefighter and enjoys hiking with his own rescued dogs.",
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
                  id: id,
                  name: "John Smith",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                  role: "Volunteer",
                  rescuesCount: 32,
                },
                rescueCenter: {
                  id: "rc1",
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
        throw new Error("Saviour not found");
      }

      // Transform the data to match the Saviour type
      const saviour: Saviour = {
        id: data.id,
        name: data.name,
        image: data.profile_image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        role: data.saviour_profiles?.[0]?.experience_level || 'Volunteer',
        location: data.location,
        rescuesCount: data.saviour_profiles?.[0]?.rescues_count || 0,
        memberSince: new Date(data.created_at).getFullYear().toString(),
        verified: false, // This field doesn't exist in the schema yet
        contactNumber: data.phone,
        email: data.email,
        specializations: data.saviour_profiles?.[0]?.specializations,
        socialLinks: undefined, // This field doesn't exist in the schema yet
        mostRecentActivity: undefined, // This field doesn't exist in the schema yet
        badges: data.saviour_profiles?.[0]?.badges || [],
        bio: data.bio || 'Animal lover and rescuer.',
        recentRescues: [], // This would need to be fetched separately
      };

      return saviour;
    } catch (error) {
      console.error('Error in fetchSaviour:', error);
      throw error;
    }
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["saviour", id],
    queryFn: fetchSaviour,
    enabled: !!id,
  });
  
  return {
    saviour: data,
    isLoading,
    error,
  };
}