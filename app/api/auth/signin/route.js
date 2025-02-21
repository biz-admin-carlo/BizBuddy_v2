// File: biz-web-app/app/api/auth/signin/route.js

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
    const users = await prisma.user.findMany({
      where: { email },
      include: { company: true, profile: true },
    });

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const validUsers = [];
    for (const user of users) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        validUsers.push(user);
      }
    }

    if (validUsers.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ users: validUsers });
  } catch (err) {
    console.error("SignIn route error:", err);
    return NextResponse.json(
      { error: "Failed to sign in" },
      { status: 500 }
    );
  }
}
