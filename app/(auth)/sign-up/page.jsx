// File: biz-web-app/app/(auth)/sign-up/page.jsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Footer from "@/components/Partial/Footer";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planFromQuery = searchParams.get("plan") || "free-1";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    plan: planFromQuery,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    localStorage.setItem("userRegistrationData", JSON.stringify(formData));
    router.push(`/company-details?plan=${encodeURIComponent(formData.plan)}`);
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center ">
      <div className="min-h-[80vh] flex  p-4 max-w-7xl mx-auto">
        <div className="w-full p-8 rounded-3xl shadow border-t border-l border-r  mx-auto max-w-3xl text-sm tracking-wider">
          <h2 className="text-lg font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block mb-1 ">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent "
                required
              />
            </div>
            <div>
              <label className="block mb-1">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent "
                required
              />
            </div>
            <div>
              <label className="block mb-1 ">Username (unique):</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent "
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent "
                required
              />
            </div>
            <div>
              <label className="block mb-1 ">Phone Number (optional):</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent "
              />
            </div>
            <div className="relative ">
              <label className="block mb-1 ">Password:</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent pr-10 "
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer "
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeOff className="h-5 w-5 text-gray-500 relative top-3" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 relative top-3" />
                )}
              </div>
            </div>
            <div className="relative">
              <label className="block mb-1 ">Confirm Password:</label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <EyeOff className="h-5 w-5 text-gray-500 relative top-3" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 relative top-3" />
                )}
              </div>
            </div>
            <div>
              <label className="block mb-1 ">Selected Plan:</label>
              <button
                type="button"
                onClick={() => router.push("/pricing")}
                className="w-full p-2 rounded border  border-orange-600 hover:bg-orange-700"
              >
                {formData.plan}
              </button>
            </div>
            <div className="h-[9vh] py-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-orange-600 hover:bg-700 text-white tracking-wider p-2 rounded flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                Next
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </button>
              {error && (
                <div className="mb-4 text-sm text-center py-2 text-red-500 rounded">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
