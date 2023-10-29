import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/user/dashboard" &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/user/dashboard"],
};
