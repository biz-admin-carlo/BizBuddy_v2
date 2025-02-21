// File: biz-web-app/app/(home)/pricing/page.jsx

"use client";

import { useState, useEffect } from "react";
import PlanCard from "@/components/SubscriptionPlan/PlanCard";
import Footer from "@/components/Partial/Footer";

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/subscription-plans/list", {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch plans");
        }
        const data = await res.json();
        setPlans(data.plans);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading subscription plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-6xl text-orange-500">{error}</p>
      </div>
    );
  }

  // Group plans by their name (Free, Basic, Pro)
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.name]) {
      acc[plan.name] = {
        name: plan.name,
        options: [],
        features: plan.features,
      };
    }
    acc[plan.name].options.push(plan);
    return acc;
  }, {});

  const groupedPlansArray = Object.values(groupedPlans);

  return (
    <div className="flex flex-col justify-between items-center ">
      <h1 className="lg:text-5xl md:text-4xl text-2xl text-nowrap font-bold text-center mb-10 text-orange-500 mt-12 px-4">
        Our Subscription Plans
      </h1>

      <div className="grid gap-8 md:grid-cols-3 px-4 w-full">
        {groupedPlansArray.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
