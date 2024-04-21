import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (req: NextRequest) => {
  const verifyToken = cookies().get("verifyToken")?.value;

  if (!verifyToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/users", "/winners", "/prizes"],
};
