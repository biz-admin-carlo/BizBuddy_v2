// biz-web-app/app/api/stripe/create-payment-intent/route.js


import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });

    const body = await request.json();
    const { planId, email } = body;
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Subscription plan not found" }, { status: 404 });
    }

    const amountInCents = Math.round(parseFloat(plan.price) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        planId: plan.id,
        userEmail: email,
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Error creating payment intent:", err);
    return NextResponse.json({ error: "Failed to create PaymentIntent" }, { status: 500 });
  }
}
