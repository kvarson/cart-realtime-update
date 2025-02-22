import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let token = req.cookies.get("token")?.value || "";

  if (!token) {
    try {
      const res = await fetch("https://take-home-be.onrender.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch token");

      const data = await res.json();
      token = data.token;

      // Store token in an HTTP-only cookie
      console.log();
      const response = NextResponse.next();
      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } catch (error) {
      console.error("Middleware Error:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }
  }

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("Authorization", `Bearer ${token}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
