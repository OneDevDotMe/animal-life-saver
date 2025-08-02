import { useState, useEffect } from 'react';
import { Rescue } from '@/types';
import { supabase } from '@/lib/supabase';

export function useRescues(searchQuery: string = "") {
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRescues = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let supabaseQuery = supabase
        .from('rescue_stories')
        .select(`
          *,
          users!rescue_stories_saviour_id_fkey (
            id,
            name,
            profile_image_url
          ),
          rescue_centers:users!rescue_stories_rescue_center_id_fkey (
            id,
            name,
            profile_image_url
          )
        `)
        .order('date', { ascending: false });

      if (searchQuery) {
        supabaseQuery = supabaseQuery.or(`title.ilike.%${searchQuery}%,story.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      let formattedRescues: Rescue[] = data?.map(story => ({
        id: story.id,
        title: story.title,
        image: story.image_url || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: story.date,
        location: story.location || 'Unknown location',
        status: story.status,
        story: story.story,
        beforeAfterImages: story.before_image_url && story.after_image_url ? {
          before: story.before_image_url,
          after: story.after_image_url
        } : undefined,
        saviour: {
          id: story.users?.id || '',
          name: story.users?.name || 'Anonymous',
          image: story.users?.profile_image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          role: 'Volunteer',
          rescuesCount: 0
        },
        rescueCenter: {
          id: story.rescue_centers?.id || '',
          name: story.rescue_centers?.name || 'Local Rescue',
          image: story.rescue_centers?.profile_image_url || 'https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          location: story.location || 'Unknown location'
        }
      })) || [];

      // If no rescues found, provide sample data for testing
      if (formattedRescues.length === 0) {
        formattedRescues = [
          {
            id: "r1",
            title: "Injured Golden Retriever Rescued from Highway",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Aug 15, 2025",
            location: "Manhattan, NY",
            status: "Completed",
            story: "Found an injured Golden Retriever on the highway. The dog was limping and appeared to be in pain. Our team quickly responded and safely transported the dog to veterinary care. After treatment, the dog made a full recovery and was adopted by a loving family.",
            beforeAfterImages: {
              before: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              after: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            saviour: {
              id: "s1",
              name: "John Smith",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              role: "Volunteer",
              rescuesCount: 32
            },
            rescueCenter: {
              id: "rc1",
              name: "Paws & Claws Rescue",
              image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              location: "New York, NY"
            }
          },
          {
            id: "r2",
            title: "Abandoned Kittens Found in Dumpster",
            image: "https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "Aug 10, 2025",
            location: "Brooklyn, NY",
            status: "Completed",
            story: "Rescued 5 abandoned kittens from a dumpster. All kittens are now healthy and ready for adoption. They were found in poor condition but have made a full recovery.",
            beforeAfterImages: {
              before: "https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              after: "https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            saviour: {
              id: "s2",
              name: "Sarah Johnson",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              role: "Staff",
              rescuesCount: 45
            },
            rescueCenter: {
              id: "rc1",
              name: "Paws & Claws Rescue",
              image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              location: "New York, NY"
            }
          },
        ];
      }

      setRescues(formattedRescues);
    } catch (err) {
      console.error('Error fetching rescues:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch rescue stories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, [searchQuery]);

  return { rescues, isLoading, error, refetch: fetchRescues };
}