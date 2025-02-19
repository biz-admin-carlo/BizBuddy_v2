// // File: biz-web-app/app/(auth)/company-details/page.jsx

// "use client";
// export const dynamic = "force-dynamic";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function CompanyDetailsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const plan = searchParams.get("plan");

//   const [companyData, setCompanyData] = useState({
//     companyName: "",
//     industry: "",
//     location: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // For storing user data from localStorage
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const storedData = localStorage.getItem("userRegistrationData");
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setCompanyData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!userData) {
//       setError("User registration data not found. Please sign up again.");
//       return;
//     }
//     setLoading(true);

//     try {
//       const payload = {
//         ...userData,
//         plan,
//         ...companyData,
//       };

//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//         setLoading(false);
//         return;
//       }

//       localStorage.removeItem("userRegistrationData");
//       router.push("/sign-in");
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Something went wrong creating your account.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex p-4 max-w-7xl mx-auto">
//       <div className="w-full p-8 rounded shadow border mx-auto max-w-3xl">
//         <h2 className="text-2xl text-center font-bold mb-6">Company Details</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="flex-col gap-2 justify-center items-center"
//         >
//           <div>
//             <label className="block mb-1">Company Name:</label>
//             <input
//               type="text"
//               name="companyName"
//               value={companyData.companyName}
//               onChange={handleChange}
//               className="w-full p-2 rounded border bg-transparent"
//               required
//             />
//           </div>

//           <div className="mt-auto py-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full border text-white p-2 rounded bg-orange-600"
//             >
//               {loading ? "Submitting..." : "Submit & Continue"}
//             </button>

//             {error && (
//               <div className="mb-4 text-sm text-center py-2 text-red-500 rounded">
//                 {error}
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
