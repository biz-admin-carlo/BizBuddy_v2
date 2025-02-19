// biz-web-app/app/api/subscription-plans/list/route.js

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.subscriptionPlan.findMany();
    return NextResponse.json({ plans });
  } catch (err) {
    console.error("Fetch plans error:", err);
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}
