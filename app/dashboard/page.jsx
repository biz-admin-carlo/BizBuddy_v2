"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";

import Sidebar from "@/components/Dashboard/SideBar";
import DashboardContent from "@/components/Dashboard/DashboardContent";

export default function Dashboard() {
  const { token } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.push("/sign-in");
    } else if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUser(decoded);
      } catch (err) {
        console.error("Failed to decode token:", err);
        router.push("/sign-in");
      }
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token || !user) return null;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto,1fr]">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} user={user} />
      <DashboardContent activeNav={activeNav} companyId={user.company?.id} />
    </div>
  );
}
