import { NextRequest, NextResponse } from 'next/server'

// Pages that require login
const PROTECTED = ['/professionals', '/bookings', '/dashboard']

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const isProtected = PROTECTED.some(p => pathname.startsWith(p))
    if (!isProtected) return NextResponse.next()

    // Check for Firebase auth token cookie (set by FirebaseAuthProvider)
    const token = req.cookies.get('fb_token')?.value

    if (!token) {
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('next', pathname)  // redirect back after login
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/professionals/:path*', '/bookings/:path*', '/dashboard/:path*'],
}