// File: biz-web-app/app/api/user/profile/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid token" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Extract the username from the token payload since username is the unique identifier.
    const { username } = payload;

    // Query the database for the full user data, including the profile and company.
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        company: true, // Include the company relation
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract companyId and companyName from the user object
    const { companyId, company } = user;
    const companyName = company ? company.name : null;

    return NextResponse.json({
      user: {
        ...user,
        companyId,
        companyName,
      },
    });
  } catch (err) {
    console.error("Profile route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
