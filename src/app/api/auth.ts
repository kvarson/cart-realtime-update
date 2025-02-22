import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  cookies().set("visitorToken", token, {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
