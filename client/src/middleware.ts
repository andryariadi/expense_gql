// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

const protectedRoutes = ["/", "/transaction", "/profile"];

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("connect.sid");
  const { pathname } = request.nextUrl;

  // Jika mencoba mengakses protected route tanpa cookie
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !cookie) {
    // Redirect ke login jika bukan sedang di halaman login
    if (!publicRoutes.includes(pathname)) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Jika sudah login tapi mencoba mengakses public route (login/signup)
  if (publicRoutes.includes(pathname) && cookie) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
