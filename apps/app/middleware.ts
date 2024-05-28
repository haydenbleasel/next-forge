import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  /^(?!\/(?<path>sign-in|sign-up)).*$/iu,
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [String.raw`/((?!.*\..*|_next).*)`, '/', '/(api|trpc)(.*)'],
};
