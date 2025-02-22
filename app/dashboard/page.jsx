// File: biz-web-app/app/dashboard/page.jsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import Sidebar from "@/components/Dashboard/SideBar";
import DashboardContent from "@/components/Dashboard/DashboardContent";

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/sign-in");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) return null;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto,1fr]">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} user={user} />
      <DashboardContent activeNav={activeNav} companyId={user.company?.id} />
    </div>
  );
}
