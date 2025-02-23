// File: biz-web-app/app/(auth)/sign-in/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Crown, Shield, UserCheck, User } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import Footer from "@/components/Partial/Footer";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `/api/auth/signin?email=${encodeURIComponent(formData.email)}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (!data.users || data.users.length === 0) {
        setError("No companies found for this email.");
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
    setSelectedCompanyId(companyId);
    setError("");
  };

  const handleSignInWithPassword = async (e) => {
    e.preventDefault();
    if (!selectedCompanyId) {
      setError("Please select a company.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `/api/auth/signin?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(
          formData.password
        )}&companyId=${encodeURIComponent(selectedCompanyId)}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (!data.token) {
        setError("Invalid credentials.");
        setLoading(false);
        return;
      }
      login(data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "superadmin":
        return <Crown className="h-4 w-4" />;
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "supervisor":
        return <UserCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
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
            onSubmit={handleEmailSubmit}
            className="space-y-6 max-w-md mx-auto bg-orange-50 dark:bg-neutral-900 p-8 rounded-3xl shadow-xl"
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
                onClick={() => router.push("/pricing")}
                className="mt-1 underline text-orange-500 hover:text-orange-700"
              >
                Create one here
              </button>
            </div>
          </motion.form>
        )}
        {step === 2 && (
          <motion.div
            className="max-w-md mx-auto bg-orange-50 dark:bg-neutral-900 p-7 rounded-3xl shadow-xl space-y-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center font-semibold mb-3">{formData.email}</p>
            <div className="flex justify-between px-2 items-center w-full text-sm font-bold uppercase border-b pb-1 mb-2">
              <span>Company</span>
              <span>Username</span>
              <span>Role</span>
            </div>
            {users.map((u) => (
              <button
                key={u.companyId}
                onClick={() => handleCompanySelect(u.companyId)}
                disabled={loading}
                className={`w-full p-2 border-b text-sm font-semibold capitalize flex items-center justify-between ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } ${
                  selectedCompanyId === u.companyId
                    ? "bg-gradient-to-t from-orange-500 to-orange-600 transition-colors text-white font-semibold rounded-xl"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{u.company?.name || "No Name"}</span>
                  <span>{u.username}</span>
                  <span>{getRoleIcon(u.role)}</span>
                </div>
              </button>
            ))}
            {selectedCompanyId && (
              <motion.form
                onSubmit={handleSignInWithPassword}
                className="space-y-6 mt-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded-xl text-sm dark:bg-neutral-800 bg-white outline-none bg-transparent mt-5"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  Sign In{" "}
                  {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </button>
              </motion.form>
            )}
            {error && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}
