import { NextResponse, NextRequest } from 'next/server';

const publicRoutes = ['/login(.*)', '/register(.*)', '/'];

export const middleware = async (request: NextRequest) => {

  const { pathname } = request.nextUrl;

  if (publicRoutes) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get('token')?.value
}


// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};