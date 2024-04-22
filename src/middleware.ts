import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (req: NextRequest) => {
  const verifyToken = cookies().get("verifyToken")?.value;

  if (
    !verifyToken &&
    (req.url.includes("/users") ||
      req.url.includes("/winners") ||
      req.url.includes("/prizes"))
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else if (verifyToken && req.url.includes("/auth")) {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/users", "/winners", "/prizes", "/auth", "/auth/verify"],
};
