"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import Footer from "@/components/Partial/Footer";

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular,
  onSelect,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${
        isPopular ? "relative border-2 border-green-500" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 text-xs rounded-full">
          POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-orange-500">{title}</h3>
      <p className="text-xl font-bold mt-2">{price}</p>
      <p className="text-sm text-gray-600 mt-2 mb-4">{description}</p>
      <div className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.available ? (
                <Check className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <X className="w-5 h-5 text-red-500 mr-2" />
              )}
              <span className="text-sm text-gray-600">Feature</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onSelect}
        className={`mt-6 w-full py-2 px-4 rounded-md font-medium ${
          isPopular
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        GET STARTED
      </button>
    </div>
  );
};

export default function PricingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulating data fetch
    setIsLoading(false);
  }, []);

  const handleSelectPlan = (plan) => {
    if (plan.price === "FREE") {
      router.push(`/sign-up?plan=${encodeURIComponent(plan.title)}`);
    } else {
      const userEmail = "john@company.com";
      router.push(
        `/payment?planId=${encodeURIComponent(
          plan.id
        )}&email=${encodeURIComponent(userEmail)}`
      );
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  const plans = [
    {
      id: "starter",
      title: "Starter",
      price: "FREE",
      description:
        "A great way to explore BizBuddy with full access to essential timekeeping features",
      features: [
        { available: true },
        { available: true },
        { available: true },
        { available: false },
        { available: false },
        { available: false },
        { available: false },
        { available: false },
      ],
    },
    {
      id: "pro",
      title: "Pro Plan",
      price: "Custom Pricing",
      description:
        "Designed for businesses that need full access to essential timekeeping features",
      features: Array(10).fill({ available: true }),
      isPopular: true,
    },
    {
      id: "basic",
      title: "Basic Plan",
      price: "Custom Pricing",
      description:
        "Ideal for growing businesses that need more control and insights into their team's productivity",
      features: [
        { available: true },
        { available: true },
        { available: false },
        { available: false },
        { available: false },
      ],
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Best Plan</h1>
          <p className="text-gray-600 mb-4">
            All our plans work great for businesses of any size! Just pick the
            one that fits your needs best, and select the number of users to see
            the corresponding price.
          </p>
          <button className="text-red-500 hover:text-red-600">
            COMPARE PLANS {">>>"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              {...plan}
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Custom Plan</h3>
            <p className="text-gray-600 mb-4">
              Need a plan tailored to your business? Contact us to customize
              user limits, features, and pricing to fit your needs.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Contact Us!
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
