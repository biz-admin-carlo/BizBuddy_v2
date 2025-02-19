// File: biz-web-app/app/payment/page.jsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planId = searchParams.get("planId") || "free-1";
  const email = searchParams.get("email") || "no-email@example.com";

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId, email }),
        });
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          setLoading(false);
          return;
        }
        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        console.error("API error:", err);
        setLoading(false);
      }
    }
    createPaymentIntent();
  }, [planId, email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Payment...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to initiate payment. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded shadow bg-white dark:bg-[#1a1a1a] border border-neutral-300 dark:border-neutral-600">
        <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
        <p className="mb-4">
          You are purchasing plan: <strong>{planId}</strong>
        </p>
        <p className="mb-4">
          Email: <strong>{email}</strong>
        </p>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm planId={planId} email={email} />
        </Elements>
      </div>
    </div>
  );
}

function PaymentForm({ planId, email }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet. Please wait.");
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent.id);
      setPaymentSuccess(true);
      setProcessing(false);
    } else {
      setErrorMessage("Payment not completed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <>
      {!paymentSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement />
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={processing || !stripe}
            className="w-full bg-primary text-white p-2 rounded mt-4"
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      ) : (
        <PaymentSuccessModal planId={planId} email={email} router={router} />
      )}
    </>
  );
}

function PaymentSuccessModal({ planId, email, router }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-lg
                   transform transition-all duration-500
                   animate-[fadeIn_0.5s_ease-out]"
      >
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="mb-4">
          Thank you for purchasing plan: <strong>{planId}</strong>
        </p>
        <p className="mb-6">
          Email: <strong>{email}</strong>
        </p>
        <button
          onClick={() => router.push("/company-details")}
          className="w-full bg-primary text-white p-2 rounded"
        >
          Continue to Company Details
        </button>
      </div>
    </div>
  );
}
