import { createServerSupabaseClient } from './supabase-client';
import type { Database, Profile, Memorial, Memory, Comment, MemorialCollaborator } from '@/types/database';

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function createProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return null;
  }

  return data;
}

export async function getMemorials(userId: string): Promise<Memorial[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .or(`user_id.eq.${userId},memorial_collaborators(user_id).eq.${userId}`);

  if (error) {
    console.error('Error fetching memorials:', error);
    return [];
  }

  return data;
}

export async function getMemorial(id: string): Promise<Memorial | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching memorial:', error);
    return null;
  }

  return data;
}

export async function createMemorial(memorial: Partial<Memorial>): Promise<Memorial | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memorials')
    .insert([memorial])
    .select()
    .single();

  if (error) {
    console.error('Error creating memorial:', error);
    return null;
  }

  return data;
}

export async function getMemories(memorialId: string): Promise<Memory[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('memorial_id', memorialId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching memories:', error);
    return [];
  }

  return data;
}

export async function createMemory(memory: Partial<Memory>): Promise<Memory | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memories')
    .insert([memory])
    .select()
    .single();

  if (error) {
    console.error('Error creating memory:', error);
    return null;
  }

  return data;
}

export async function getComments(memoryId: string): Promise<Comment[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('memory_id', memoryId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data;
}

export async function createComment(comment: Partial<Comment>): Promise<Comment | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single();

  if (error) {
    console.error('Error creating comment:', error);
    return null;
  }

  return data;
}

export async function addCollaborator(
  collaborator: Partial<MemorialCollaborator>
): Promise<MemorialCollaborator | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memorial_collaborators')
    .insert([collaborator])
    .select()
    .single();

  if (error) {
    console.error('Error adding collaborator:', error);
    return null;
  }

  return data;
}

export async function getCollaborators(memorialId: string): Promise<MemorialCollaborator[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('memorial_collaborators')
    .select('*')
    .eq('memorial_id', memorialId);

  if (error) {
    console.error('Error fetching collaborators:', error);
    return [];
  }

  return data;
}
