// File: biz-web-app/app/api/auth/register/route.js

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const {
      username,
      email,
      password,
      plan,       
      firstName,
      lastName,
      phone,
      companyName,   
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const userProfile = await tx.userProfile.create({
        data: {
          firstName,
          lastName,
          phoneNumber: phone,
          username,
          email,
        },
      });
      
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          profileId: userProfile.id,
          companyId: null,
        },
      });
      const company = await tx.company.create({
        data: {
          name: companyName,
          userId: user.id,
        },
      });
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { companyId: company.id },
      });
      const subscriptionPlan = await tx.subscriptionPlan.findFirst({
        where: { id: plan },
      });
      console.log('plan: ', plan )
      console.log('test4.5');
      if (!subscriptionPlan) {
        throw new Error("Subscription plan not found");
      }
      const subscription = await tx.subscription.create({
        data: {
          userId: updatedUser.id,
          companyId: company.id,
          planId: subscriptionPlan.id,
        },
      });
      const payment = await tx.payment.create({
        data: {
          companyId: company.id,
          amount: subscriptionPlan.price,
        },
      });
      console.log('test7');
      return { user: updatedUser, company, subscription, payment, userProfile };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Registration error:", err.message);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
