import { NextResponse, NextRequest } from 'next/server';

const publicRoutes = ['/login(.*)', '/register(.*)', '/'];

export const middleware = async (request: NextRequest) => {

  const { pathname } = request.nextUrl;

  // Check if the current path matches any public route
  const isPublicRoute = publicRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(pathname);
  });

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get('token')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

   // If user is authenticated and trying to access login or register, redirect to dashboard
   if (sessionToken && (pathname === '/login' || pathname === '/register')) {
    console.log("The pathname is called" + pathname)
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
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