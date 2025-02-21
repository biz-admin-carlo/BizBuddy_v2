// File: biz-web-app/app/dashboard/page.jsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { Menu, X } from "lucide-react";

// Core navigation items.
const navItems = [
  { id: "home", label: "Home" },
  { id: "time-logs", label: "Time Logs" },
  { id: "payroll", label: "Payroll" },
  { id: "leaves", label: "Leaves" },
];

// Component to render the user's avatar and information.
function SidebarUserInfo({ user }) {
  const getInitials = () => {
    const firstInitial = user.profile?.firstName
      ? user.profile.firstName.charAt(0)
      : user.username?.charAt(0) || "";
    const lastInitial = user.profile?.lastName
      ? user.profile.lastName.charAt(0)
      : "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  const initials = getInitials();
  const displayName =
    user.profile?.firstName || user.profile?.lastName
      ? `${user.profile.firstName || ""} ${user.profile.lastName || ""}`.trim()
      : user.username;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r capitalize from-orange-500 to-orange-600 flex items-center justify-center text-2xl  text-white mx-auto my-auto font-bold">
        {initials}
      </div>
      <div className="mt-2 text-center">
        <p className="font-semibold capitalize">{displayName}</p>
        <p className=" text-neutral-500 capitalize mt-1">{user.company.name}</p>
        <p className=" text-neutral-500 capitalize">{user.role}</p>
      </div>
    </div>
  );
}

// Component for main navigation.
function MainNavigation({ activeNav, onNavChange }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">Dashboard</h2>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavChange(item.id)}
              className={`block w-full text-left p-2 my-1 rounded-xl ${
                activeNav === item.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold"
                  : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// Component for role-based options.
function RoleBasedOptions({ role, onNavChange }) {
  const roleBasedNavItems = {
    superadmin: [
      { id: "my-subscription", label: "My Subscription" },
      { id: "manage-users", label: "Manage Users" },
    ],
    admin: [
      { id: "my-subscription", label: "My Subscription" },
      { id: "company-settings", label: "Company Settings" },
    ],
  };

  const items = roleBasedNavItems[role];
  if (!items) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Admin Options</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavChange(item.id)}
              className="block w-full text-left p-2 rounded-xl my-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// New component to fetch and display the current subscription.
function CompanySubscription({ companyId }) {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubscription() {
      try {
        // Adjust the API endpoint as needed.
        const res = await fetch(
          `/api/subscription/current?companyId=${companyId}`
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setSubscription(data.subscription);
        }
      } catch (err) {
        setError("Failed to fetch subscription.");
      }
      setLoading(false);
    }
    if (companyId) {
      fetchSubscription();
    }
  }, [companyId]);

  if (loading) return <p>Loading subscription...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!subscription)
    return <p>No active subscription found for your company.</p>;

  return (
    <div className="mt-8 p-4 border rounded-xl">
      <h3 className="text-xl font-bold mb-2">Current Subscription</h3>
      <p>
        <strong>Plan:</strong> {subscription.plan?.name}
      </p>
      <p>
        <strong>Price:</strong> ${subscription.plan?.price}/mo
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(subscription.startDate).toLocaleDateString()}
      </p>
      {subscription.endDate && (
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(subscription.endDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

// Main Sidebar component composing all modular parts.
function Sidebar({ activeNav, onNavChange, user }) {
  return (
    <aside className="w-56  border-r p-4 h-full">
      <SidebarUserInfo user={user} />
      <MainNavigation activeNav={activeNav} onNavChange={onNavChange} />
      <RoleBasedOptions role={user.role} onNavChange={onNavChange} />
    </aside>
  );
}

// Component to display the main dashboard content.
function DashboardContent({ activeNav, companyId }) {
  return (
    <main className="py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>Selected Section: {activeNav}</p>
      {/* Render the current subscription for the company */}
      {companyId && <CompanySubscription companyId={companyId} />}
    </main>
  );
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");
  const [hydrated, setHydrated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.push("/sign-in");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return null;
  }

  // Assuming the user object has a company property.
  const companyId = user.company?.id;

  return (
    <div className="min-h-screen flex">
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} user={user} />
      </div>
      <div className="flex-1 ml-0 md:ml-32">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 md:hidden z-40 p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <div className="px-4 md:pr-20">
          <DashboardContent activeNav={activeNav} companyId={companyId} />
        </div>
      </div>
    </div>
  );
}
