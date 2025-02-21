import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "username is required" },
        { status: 400 }
      );
    }

    // Check if any user already uses this username
    const user = await prisma.user.findFirst({
      where: { username },
    });

    return NextResponse.json({ available: !user });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json({ error: "Failed to check username" }, { status: 500 });
  }
}
