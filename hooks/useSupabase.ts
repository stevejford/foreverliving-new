import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/utils/supabaseClient';

export function useSupabase() {
  const { getToken } = useAuth();

  useEffect(() => {
    const updateSupabaseAuth = async () => {
      try {
        // Get the JWT token from Clerk
        const token = await getToken({ template: 'supabase' });
        
        if (token) {
          // Update Supabase auth
          supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          });
        }
      } catch (error) {
        console.error('Error updating Supabase auth:', error);
      }
    };

    // Update auth when component mounts
    updateSupabaseAuth();

    // Set up interval to refresh token
    const interval = setInterval(updateSupabaseAuth, 1000 * 60 * 59); // Refresh every 59 minutes

    return () => clearInterval(interval);
  }, [getToken]);

  return supabase;
}
