// File: biz-web-app/app/api/auth/signin/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Ensure this import is correct

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const companyId = searchParams.get("companyId");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { email },
      include: { company: true, profile: true },
    });

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // If password or companyId is not provided, return companies associated with the email
    if (!password || !companyId) {
      return NextResponse.json({ users });
    }

    // Validate the password for the selected company
    const user = users.find((u) => u.companyId === companyId);
    if (!user) {
      return NextResponse.json(
        { error: "Company not associated with this email" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create the token payload with the required data
    const payload = {
      email: user.email,
      company: user.company,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("SignIn route error:", err);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}