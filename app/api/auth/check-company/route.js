import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    // Check if a company already exists with this name
    const company = await prisma.company.findFirst({
      where: { name },
    });

    return NextResponse.json({ available: !company });
  } catch (error) {
    console.error("Error checking company name:", error);
    return NextResponse.json({ error: "Failed to check company name" }, { status: 500 });
  }
}
