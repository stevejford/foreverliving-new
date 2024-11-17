import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes directly in middleware
const protectedRoutes = [
  '/dashboard',
  '/create-memorial',
  '/gallery',
  '/contact',
  '/auth/callback',
  '/sso-callback',
  '/api'
]

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // Handle static files and assets
    if (
      req.nextUrl.pathname.startsWith('/_next/') ||
      req.nextUrl.pathname.startsWith('/static/') ||
      req.nextUrl.pathname.startsWith('/videos') ||
      req.nextUrl.pathname.startsWith('/images') ||
      req.nextUrl.pathname.includes('.') // Skip files with extensions
    ) {
      return res
    }

    // Set proper MIME types for static assets
    if (req.nextUrl.pathname.endsWith('.js')) {
      res.headers.set('Content-Type', 'application/javascript')
    } else if (req.nextUrl.pathname.endsWith('.css')) {
      res.headers.set('Content-Type', 'text/css')
    } else if (req.nextUrl.pathname.endsWith('.woff2')) {
      res.headers.set('Content-Type', 'font/woff2')
    }

    // Get the session first
    const { data: { session } } = await supabase.auth.getSession()

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(`${route}/`)
    )

    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // Auth routes (sign-in, sign-up)
    const authRoutes = ['/sign-in', '/sign-up']
    const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Add custom headers
    res.headers.set('x-url', req.url)

    return res
  } catch (e) {
    console.error('Middleware error:', e)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
