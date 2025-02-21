// File: biz-web-app/app/(auth)/payment/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Footer from "@/components/Partial/Footer";
import { motion } from "framer-motion";

// Load your publishable key from env variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ planId, onPaymentSuccess, email, companyName }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    // Create a PaymentIntent by calling our API
    const res = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, email, companyName }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setProcessing(false);
      return;
    }
    setClientSecret(data.clientSecret);

    // Confirm the card payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email, name: companyName },
      },
    });
    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      // Securely update payment status (stored locally for UI update)
      localStorage.setItem("paymentStatus", "paid");
      onPaymentSuccess();
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 pt-10 pb-2 gap-1  flex-col flex"
    >
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              color: "#ffffff", // text color for typed values in dark mode (adjust if needed)
              fontSize: "14px",
              "::placeholder": {
                color: "#cccccc", // placeholder text color
              },
            },
            invalid: {
              color: "#fa755a",
            },
          },
        }}
        className="p-3 rounded-xl dark:bg-neutral-800 bg-white "
      />

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 mt-10 font-semibold text-sm text-white p-2.5 rounded-xl transition-colors disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && (
        <div className=" text-center text-red-500 text-sm">{error}</div>
      )}
    </form>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  // Retrieve email and companyName from stored sign-up data
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    const storedEmail = localStorage.getItem("userEmail");
    const storedCompany = localStorage.getItem("companyName");
    if (storedEmail) setEmail(storedEmail);
    if (storedCompany) setCompanyName(storedCompany);
  }, []);

  const handlePaymentSuccess = () => {
    router.push("/sign-up");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-xl rounded-xl space-y-10">
        <motion.h2
          className="text-orange-500 font-bold mb-8 text-center pb-2 max-w-7xl mx-auto text-xl sm:text-2xl md:text-4xl lg:text-5xl capitalize"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Payment
        </motion.h2>
        <motion.div
          className="bg-orange-50 dark:bg-neutral-900 p-7 rounded-3xl shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {plan ? (
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold md:text-3xl text-xl">
                  {plan.name} Plan
                </span>
                <span className="text-xl md:text-3xl ">${plan.price}</span>
              </div>
              <p>{plan.rangeOfUsers} users</p>
              <p className="text-sm mt-4">{plan.description}</p>
            </div>
          ) : (
            <p className="text-neutral-600">No plan selected.</p>
          )}
          {(!email || !companyName) && (
            <div className="mb-4 text-red-500">
              Missing user email or company name. Please complete your sign-up
              details.
            </div>
          )}
          <Elements stripe={stripePromise}>
            {plan && email && companyName && (
              <CheckoutForm
                planId={plan.id}
                email={email}
                companyName={companyName}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
          </Elements>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
}
