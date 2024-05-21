import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  // Create the Supabase client within the request context
  const supabase = createClient();

  // Fetch the session from the cookies
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    // Check if the user is authorized to access the route
    if (request.nextUrl.pathname.startsWith('/family-management') && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // If no issues, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
