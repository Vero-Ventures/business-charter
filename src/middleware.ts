import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // Allow access to login and signup pages without authentication
  const unauthenticatedPaths = ['/login', '/signup'];
  if (unauthenticatedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (userError || !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/family-management') && profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};