import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isUserAuthenticated = !!token;
  const isLoginPage = ["/login", "/signup"].includes(pathname);
  const isProtectedRoute = ["/user/dashboard", "/app", "/upgrade"].includes(
    pathname
  );

  if (!isUserAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isUserAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/user/dashboard", "/app", "/upgrade"],
};
