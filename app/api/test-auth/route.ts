import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/utils/auth-helpers';

export async function GET(request: NextRequest) {
  return withAuth(request, async (userId, supabase) => {
    // Get user profile data
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, email')
      .eq('id', userId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Authentication successful',
      user: profile
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (userId, supabase) => {
    try {
      const body = await request.json();
      
      // Example: Update user profile
      const { error } = await supabase
        .from('profiles')
        .update({
          updated_at: new Date().toISOString(),
          ...body
        })
        .eq('id', userId);

      if (error) throw error;

      return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  });
}
