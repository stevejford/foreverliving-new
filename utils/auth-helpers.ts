import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.delete({ name, ...options })
          } catch (error) {
            // Handle cookie removal error
          }
        },
      },
    }
  )
}

export const getSession = async () => {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export const getUserDetails = async () => {
  const supabase = createServerSupabaseClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user found')

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      ...user,
      ...profile
    }
  } catch (error) {
    console.error('Error getting user details:', error)
    return null
  }
}

export const requireAuth = async () => {
  const session = await getSession()
  if (!session) {
    throw new Error('Not authenticated')
  }
  return session
}

export const checkAuthorization = async (memorialId: string) => {
  const session = await requireAuth()
  const supabase = createServerSupabaseClient()

  try {
    // Check if user is the owner
    const { data: memorial } = await supabase
      .from('memorials')
      .select('*')
      .eq('id', memorialId)
      .eq('user_id', session.user.id)
      .single()

    if (memorial) return true

    // Check if user is a collaborator
    const { data: collaborator } = await supabase
      .from('memorial_collaborators')
      .select('*')
      .eq('memorial_id', memorialId)
      .eq('user_id', session.user.id)
      .single()

    return !!collaborator
  } catch (error) {
    console.error('Error checking authorization:', error)
    return false
  }
}
