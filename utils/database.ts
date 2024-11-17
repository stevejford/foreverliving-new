import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Tables = Database['public']['Tables']
export type Memorial = Tables['memorials']['Row']
export type Memory = Tables['memories']['Row']
export type Profile = Tables['profiles']['Row']
export type Comment = Tables['comments']['Row']
export type MemorialCollaborator = Tables['memorial_collaborators']['Row']

export async function getMemorialById(id: string): Promise<Memorial | null> {
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching memorial:', error)
    return null
  }
  
  return data
}

export async function getMemorialsByUserId(userId: string): Promise<Memorial[]> {
  const { data, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error fetching memorials:', error)
    return []
  }
  
  return data || []
}

export async function createMemorial(memorial: Omit<Memorial, 'id' | 'created_at'>): Promise<Memorial | null> {
  const { data, error } = await supabase
    .from('memorials')
    .insert([memorial])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating memorial:', error)
    return null
  }
  
  return data
}

export async function updateMemorial(id: string, updates: Partial<Memorial>): Promise<Memorial | null> {
  const { data, error } = await supabase
    .from('memorials')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating memorial:', error)
    return null
  }
  
  return data
}

export async function deleteMemorial(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('memorials')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting memorial:', error)
    return false
  }
  
  return true
}

export async function getMemoriesByMemorialId(memorialId: string): Promise<Memory[]> {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('memorial_id', memorialId)
  
  if (error) {
    console.error('Error fetching memories:', error)
    return []
  }
  
  return data || []
}

export async function createMemory(memory: Omit<Memory, 'id' | 'created_at'>): Promise<Memory | null> {
  const { data, error } = await supabase
    .from('memories')
    .insert([memory])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating memory:', error)
    return null
  }
  
  return data
}

export async function updateMemory(id: string, updates: Partial<Memory>): Promise<Memory | null> {
  const { data, error } = await supabase
    .from('memories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating memory:', error)
    return null
  }
  
  return data
}

export async function deleteMemory(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting memory:', error)
    return false
  }
  
  return true
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  
  return data
}

export async function updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating profile:', error)
    return null
  }
  
  return data
}

export async function getCommentsByMemoryId(memoryId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('memory_id', memoryId)
  
  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }
  
  return data || []
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating comment:', error)
    return null
  }
  
  return data
}

export async function updateComment(id: string, updates: Partial<Comment>): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating comment:', error)
    return null
  }
  
  return data
}

export async function deleteComment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting comment:', error)
    return false
  }
  
  return true
}

export async function addCollaborator(collaborator: Omit<MemorialCollaborator, 'id' | 'created_at'>): Promise<MemorialCollaborator | null> {
  const { data, error } = await supabase
    .from('memorial_collaborators')
    .insert([collaborator])
    .select()
    .single()
  
  if (error) {
    console.error('Error adding collaborator:', error)
    return null
  }
  
  return data
}

export async function getCollaboratorsByMemorialId(memorialId: string): Promise<MemorialCollaborator[]> {
  const { data, error } = await supabase
    .from('memorial_collaborators')
    .select('*')
    .eq('memorial_id', memorialId)
  
  if (error) {
    console.error('Error fetching collaborators:', error)
    return []
  }
  
  return data || []
}
