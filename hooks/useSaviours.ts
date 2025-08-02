import { useState, useEffect } from 'react';
import { Saviour } from '@/types';
import { supabase } from '@/lib/supabase';

export function useSaviours() {
  const [saviours, setSaviours] = useState<Saviour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSaviours = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          saviour_profiles (*)
        `)
        .in('user_type', ['saviour', 'both'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      let formattedSaviours: Saviour[] = data?.map(user => {
        const profile = user.saviour_profiles?.[0];
        return {
          id: user.id,
          name: profile?.full_name || user.name,
          image: profile?.profile_picture || user.profile_image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          role: profile?.saviour_badge || profile?.experience_level || 'Volunteer',
          location: profile?.location_area || user.location,
          rescuesCount: profile?.rescues_submitted_count || 0,
          memberSince: new Date(user.created_at).getFullYear().toString(),
          badges: profile?.badges || [],
          bio: profile?.short_bio || user.bio || 'Animal lover and rescuer.',
          recentRescues: [],
          // Additional fields from comprehensive profile
          verified: user.verified,
          contactNumber: profile?.contact_number,
          email: profile?.email_address || user.email,
          specializations: profile?.specializations,
          socialLinks: profile?.social_links,
          mostRecentActivity: profile?.most_recent_activity
        };
      }) || [];

      // If no saviours found, provide sample data for testing
      if (formattedSaviours.length === 0) {
        formattedSaviours = [
          {
            id: "s1",
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
            bio: "John has been volunteering with animal rescue organizations for over 5 years. He specializes in emergency response and has a particular talent for gaining the trust of frightened dogs.",
            recentRescues: [],
          },
          {
            id: "s2",
            name: "Sarah Johnson",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            role: "Staff",
            location: "New York, NY",
            rescuesCount: 45,
            memberSince: "2018",
            verified: true,
            contactNumber: "+1 (555) 234-5678",
            email: "sarah.johnson@animallifesaver.org",
            specializations: "Neonatal care, Cat rehabilitation, Veterinary nursing",
            socialLinks: {
              instagram: "https://instagram.com/sarahjohnson_cats",
              facebook: "https://facebook.com/sarahjohnson.animalcare",
            },
            mostRecentActivity: "Caring for 3 orphaned kittens - 4 hours ago",
            badges: [
              {
                id: "b3",
                name: "Feline Friend",
                description: "Specialized in cat rescue and rehabilitation",
              },
              {
                id: "b4",
                name: "Neonatal Expert",
                description: "Skilled in caring for newborn animals",
              },
            ],
            bio: "Sarah joined Paws & Claws Rescue as a full-time staff member after volunteering for several years. She has a background in veterinary nursing and specializes in neonatal care for orphaned kittens.",
            recentRescues: [],
          },
        ];
      }

      setSaviours(formattedSaviours);
    } catch (err) {
      console.error('Error fetching saviours:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch saviours');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSaviours();
  }, []);

  return { saviours, isLoading, error, refetch: fetchSaviours };
} 