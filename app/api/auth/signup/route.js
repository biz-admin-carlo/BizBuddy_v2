// File: biz-web-app/app/api/auth/signup/route.js

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

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the user profile record.
      const userProfile = await tx.userProfile.create({
        data: {
          firstName,
          lastName,
          phoneNumber: phone,
          username,
          email,
        },
      });
      
      // 2. Create the User record (initially without a companyId)
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          profileId: userProfile.id,
          companyId: null,
        },
      });
      
      // 3. Create a Company record using the companyName from the form and link it to the user.
      const company = await tx.company.create({
        data: {
          name: companyName,
          userId: user.id,
        },
      });
      
      // 4. Update the User record with the newly created company's id.
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { companyId: company.id },
      });
      
      // 5. Retrieve the chosen subscription plan from the database.
      const subscriptionPlan = await tx.subscriptionPlan.findFirst({
        where: { id: plan },
      });
      console.log("plan: ", plan);
      console.log("test4.5");
      if (!subscriptionPlan) {
        throw new Error("Subscription plan not found");
      }
      
      // 6. Create a Subscription record linking the user, company, and chosen plan.
      const subscription = await tx.subscription.create({
        data: {
          userId: updatedUser.id,
          companyId: company.id,
          planId: subscriptionPlan.id,
        },
      });
      
      // 7. Create a Payment record using companyName and email.
      const payment = await tx.payment.create({
        data: {
          companyName: company.name,
          email: user.email,
          amount: subscriptionPlan.price,
        },
      });
      console.log("test7");
      
      return { user: updatedUser, company, subscription, payment, userProfile };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Registration error:", err.message);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
