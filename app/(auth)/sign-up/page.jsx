// File: biz-web-app/app/(auth)/sign-up/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Partial/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [companyForm, setCompanyForm] = useState({ name: "" });
  const [companyError, setCompanyError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) setSelectedPlan(JSON.parse(storedPlan));
    const storedUser = localStorage.getItem("userForm");
    if (storedUser) setUserForm(JSON.parse(storedUser));
    const storedCompany = localStorage.getItem("companyForm");
    if (storedCompany) setCompanyForm(JSON.parse(storedCompany));
    const storedPaymentStatus = localStorage.getItem("paymentStatus");
    if (storedPaymentStatus === "paid") {
      setPaymentStatus("paid");
      setStep(3);
    }
  }, []);

  const handleUserChange = (e) => {
    const updated = { ...userForm, [e.target.name]: e.target.value };
    setUserForm(updated);
    localStorage.setItem("userForm", JSON.stringify(updated));
    if (e.target.name === "email")
      localStorage.setItem("userEmail", e.target.value);
  };

  const handleCompanyChange = (e) => {
    const updated = { ...companyForm, [e.target.name]: e.target.value };
    setCompanyForm(updated);
    localStorage.setItem("companyForm", JSON.stringify(updated));
    if (e.target.name === "name")
      localStorage.setItem("companyName", e.target.value);
  };

  const checkUsernameAvailability = async () => {
    if (!userForm.username.trim()) return;
    try {
      const res = await fetch(
        `/api/auth/check-username?username=${encodeURIComponent(
          userForm.username
        )}`
      );
      const data = await res.json();
      setUsernameError(data.available ? "" : "Username is already taken.");
    } catch (err) {
      setUsernameError("Error checking username.");
    }
  };

  const checkCompanyAvailability = async () => {
    if (!companyForm.name.trim()) return;
    try {
      const res = await fetch(
        `/api/auth/check-company?name=${encodeURIComponent(companyForm.name)}`
      );
      const data = await res.json();
      setCompanyError(data.available ? "" : "Company name is already in use.");
    } catch (err) {
      setCompanyError("Error checking company name.");
    }
  };

  const validateStep1 = () =>
    userForm.username.trim() !== "" &&
    userForm.email.trim() !== "" &&
    userForm.password.trim() !== "" &&
    usernameError === "";
  const validateStep2 = () =>
    companyForm.name.trim() !== "" && companyError === "";

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handlePayment = () => {
    router.push("/payment");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        phone: userForm.phoneNumber,
        companyName: companyForm.name,
        plan: selectedPlan ? selectedPlan.id : null,
      };
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      localStorage.removeItem("userForm");
      localStorage.removeItem("companyForm");
      localStorage.removeItem("paymentStatus");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-between"
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
          Sign Up
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8 max-w-md mx-auto bg-orange-50 dark:bg-neutral-900 p-8 rounded-3xl shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userForm.username}
                    onChange={handleUserChange}
                    onBlur={checkUsernameAvailability}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                    required
                  />
                  {usernameError && (
                    <p className="text-red-500 text-sm">{usernameError}</p>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={handleUserChange}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={handleUserChange}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userForm.firstName}
                    onChange={handleUserChange}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userForm.lastName}
                    onChange={handleUserChange}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userForm.phoneNumber}
                    onChange={handleUserChange}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                  />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Company Details</h2>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <input
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    value={companyForm.name}
                    onChange={handleCompanyChange}
                    onBlur={checkCompanyAvailability}
                    className="w-full p-2 rounded-xl bg-white dark:bg-neutral-800 outline-none"
                    required
                  />
                  {companyError && (
                    <p className="text-red-500 text-sm">{companyError}</p>
                  )}
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Selected Plan</h2>
                {selectedPlan ? (
                  <div className="p-5 rounded-xl bg-white dark:bg-neutral-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">
                        {selectedPlan.name} Plan
                      </span>
                      <span className="text-xl">${selectedPlan.price}</span>
                    </div>
                    <div className="mb-2">
                      <p>{selectedPlan.rangeOfUsers} users</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {selectedPlan.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-10 dark:bg-neutral-900 p-4 rounded-xl bg-orange-50">
                      <span
                        className={`p-2.5 rounded-xl text-base underline tracking-widest font-bold ${
                          paymentStatus === "paid"
                            ? "text-teal-500"
                            : "text-red-500"
                        }`}
                      >
                        {paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </span>
                      {paymentStatus === "unpaid" && (
                        <button
                          type="button"
                          onClick={handlePayment}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2.5 rounded-xl text-sm font-semibold"
                        >
                          Proceed to Payment
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-600">No plan selected.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-xl font-semibold text-sm"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !validateStep1()) ||
                  (step === 2 && !validateStep2())
                }
                className="ml-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                disabled={loading || paymentStatus !== "paid"}
                className="ml-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </motion.form>
      </div>
      <Footer />
    </motion.div>
  );
}
