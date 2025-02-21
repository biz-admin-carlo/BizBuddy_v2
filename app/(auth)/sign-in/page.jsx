// File: biz-web-app/app/(auth)/sign-in/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import Footer from "@/components/Partial/Footer";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCompanyId, setLoadingCompanyId] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/auth/signin?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(formData.password)}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (!data.users || data.users.length === 0) {
        setError("No companies found for this user.");
        setLoading(false);
        return;
      }
      setUsers(data.users);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const handleCompanySelect = (companyId) => {
    setLoading(true);
    setLoadingCompanyId(companyId);
    const selectedUser = users.find((u) => u.companyId === companyId);
    if (selectedUser) {
      login(selectedUser);
    }
    setTimeout(() => {
      setLoading(false);
      setLoadingCompanyId(null);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.h2
          className="text-orange-500 font-bold mb-8 text-center pb-2 max-w-7xl mx-auto text-xl sm:text-2xl md:text-4xl lg:text-5xl capitalize"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sign In
        </motion.h2>
        {step === 1 && (
          <motion.form
            onSubmit={handleNext}
            className="space-y-6 max-w-md mx-auto bg-orange-50 border-none outline-none dark:bg-neutral-900 p-8 rounded-3xl shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">User Details</h2>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-xl text-sm dark:bg-neutral-800 bg-white outline-none bg-transparent"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-xl text-sm dark:bg-neutral-800 bg-white outline-none bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              Next{" "}
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </button>
            {error && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}
            <div className="text-center mt-6">
              <p className="text-xs">Don't have an account?</p>
              <button
                onClick={() => router.push("/sign-up")}
                className="mt-1 underline text-orange-500 hover:text-orange-700"
              >
                Create one here
              </button>
            </div>
          </motion.form>
        )}
        {step === 2 && (
          <motion.div
            className="max-w-md mx-auto bg-orange-50 dark:bg-neutral-800 p-8 rounded-3xl shadow-xl space-y-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error && (
              <div className="mb-4 p-2 text-white bg-red-500 rounded-xl">
                {error}
              </div>
            )}
            <p className="text-center font-semibold  text-lg md:text-2xl ">
              Select a company to continue:
            </p>
            {users.map((u) => {
              const compName = u.company?.name || "No Name";
              const isLoading = loadingCompanyId === u.companyId;
              return (
                <button
                  key={u.companyId}
                  onClick={() => handleCompanySelect(u.companyId)}
                  disabled={loading}
                  className={`w-full px-4 py-2 rounded-xl text-sm font-semibold capitalize bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-between ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{compName}</span>
                  {isLoading && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                  <span>
                    {u.username} ({u.role})
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}
