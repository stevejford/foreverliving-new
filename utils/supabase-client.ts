import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  return createServerComponentClient({ cookies });
}

// For client-side usage with Clerk authentication
export const createClientSupabaseClient = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
};
