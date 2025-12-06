import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authClient } from "./lib/auth";

export async function proxy(request: NextRequest) {
  // Get the user from the server-side auth-client helper
  // const {data, error} = await authClient.getSession()
  // const { pathname } = request.nextUrl;


  // const isAuthenticated = !!data?.user && !error;

  // console.log("Proxy middleware - isAuthenticated:", isAuthenticated, data, error);

  // // Routes that are accessible to everyone
  // const publicRoutes = ["/login", "/register"];
  // // Routes that are only for authenticated users
  // const protectedRoutes = ["/dashboard"]; // Add other protected routes here

  // const isPublicRoute = publicRoutes.includes(pathname);

  // if (isPublicRoute && isAuthenticated) {
  //   // If user is authenticated and tries to access login/register, redirect to dashboard
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // if (!isPublicRoute && !isAuthenticated) {
  //   // If user is not authenticated and tries to access a protected route, redirect to login
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Allow the request to continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
