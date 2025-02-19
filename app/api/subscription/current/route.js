// File: biz-web-app/app/api/subscription/current/route.js

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json(
        { error: "companyId is required" },
        { status: 400 }
      );
    }

    // Query for the current active subscription of the company.
    // We assume "current" means active, and we include the subscription plan details.
    const subscription = await prisma.subscription.findFirst({
      where: {
        companyId,
        active: true,
      },
      include: {
        plan: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ subscription });
  } catch (err) {
    console.error("Error fetching current subscription:", err);
    return NextResponse.json(
      { error: "Failed to fetch current subscription" },
      { status: 500 }
    );
  }
}
