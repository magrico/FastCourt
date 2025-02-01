// Custom hook to handle Supabase authentication
import { supabase } from '@/lib/supabase';
import type { User } from '@/lib/types';
import { useEffect, useState } from 'react';

// Custom hooks are functions that can use React hooks
// They allow us to reuse stateful logic between components
export function useSupabase() {
  // useState is a hook that lets us declare state variables
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect runs side effects in functional components
  // It runs after every render and when dependencies change
  useEffect(() => {
    // Get the current user session
    const getCurrentUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Subscribe to auth changes
    // This will update our user state whenever the authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup function that runs when the component unmounts
    // This prevents memory leaks by removing the subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return { user, loading };
}
