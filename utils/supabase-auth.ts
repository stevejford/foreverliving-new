import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClientComponentClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: { firstName: string; lastName: string }
) {
  const supabase = createClientComponentClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  const supabase = createClientComponentClient();
  return await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = createClientComponentClient();
  return await supabase.auth.getSession();
}

export async function getUser() {
  const supabase = createClientComponentClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
