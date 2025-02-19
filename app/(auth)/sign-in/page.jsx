// // File: biz-web-app/app/(auth)/sign-in/page.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";
// import useAuthStore from "@/store/useAuthStore";
// import Footer from "@/components/Partial/Footer";

// export default function SignInPage() {
//   const router = useRouter();
//   const { login } = useAuthStore();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingCompanyId, setLoadingCompanyId] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleNext = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `/api/auth/signin?email=${encodeURIComponent(
//           formData.email
//         )}&password=${encodeURIComponent(formData.password)}`
//       );
//       const data = await res.json();
//       if (data.error) {
//         setError(data.error);
//         setLoading(false);
//         return;
//       }
//       if (!data.users || data.users.length === 0) {
//         setError("No companies found for this user.");
//         setLoading(false);
//         return;
//       }
//       console.log("SignInPage: Received users:", data.users);
//       setUsers(data.users);
//       setStep(2);
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong.");
//     }
//     setLoading(false);
//   };

//   const handleCompanySelect = (companyId) => {
//     setLoading(true);
//     setLoadingCompanyId(companyId);

//     const selectedUser = users.find((u) => u.companyId === companyId);
//     console.log("SignInPage: selected user:", selectedUser);
//     if (selectedUser) {
//       login(selectedUser);
//     }
//     setTimeout(() => {
//       setLoading(false);
//       setLoadingCompanyId(null);
//       router.push("/dashboard");
//     }, 1000);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col justify-between items-center ">
//       <div className=" flex  p-4 max-w-7xl mx-auto">
//         <div className="w-full p-8 rounded-3xl shadow border-t border-l border-r  mx-auto max-w-3xl text-sm tracking-wider">
//           <h2 className="text-lg font-bold mb-6 text-center">Sign In</h2>
//           {step === 1 && (
//             <form onSubmit={handleNext} className="space-y-4">
//               <div>
//                 <label className="block mb-1">Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded border bg-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded border bg-transparent"
//                   required
//                 />
//               </div>
//               <div className="h-[8vh] pt-6">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-center ${
//                     loading ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   Next
//                   {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
//                 </button>
//                 {error && (
//                   <div className="mb-4 text-sm text-center py-2 text-red-500 rounded">
//                     {error}
//                   </div>
//                 )}
//               </div>
//               <div className=" mt-10 text-right">
//                 <p className="text-xs">Don't have an account?</p>
//                 <button
//                   onClick={() => router.push("/sign-up")}
//                   className="mt-1 underline text-orange-500 hover:text-orange-700"
//                 >
//                   Create one here
//                 </button>
//               </div>
//             </form>
//           )}
//           {step === 2 && (
//             <div className="space-y-4">
//               {error && (
//                 <div className="mb-4 p-2 text-white bg-red-500 border border-red-500 rounded">
//                   {error}
//                 </div>
//               )}
//               <p className="mb-2 text-center">Select a company to continue:</p>
//               {users.map((u) => {
//                 const compName = u.company?.name || "No Name";
//                 const isLoading = loadingCompanyId === u.companyId;
//                 return (
//                   <button
//                     key={u.companyId}
//                     onClick={() => handleCompanySelect(u.companyId)}
//                     disabled={loading}
//                     className={`w-full px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-between ${
//                       loading ? "opacity-70 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <span>{compName}</span>
//                     {isLoading && (
//                       <Loader2 className="ml-2 h-4 w-4 animate-spin" />
//                     )}
//                     <span>
//                       {u.username}({u.role})
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
