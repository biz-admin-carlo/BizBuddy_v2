// File: biz-web-app/components/Dashboard/DashboardContent/SideBar.jsx
// File: biz-web-app/components/Dashboard/DashboardContent/SideBar.jsx
"use client";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

// ── ORIGINAL NAV ITEMS FOR FEATURES ──
const originalFeaturesItems = [
  {
    id: "analytics",
    label: "Analytics",
    children: [{ id: "analytics", label: "Analytics" }],
  },
  {
    id: "time-keeping",
    label: "Time Keeping",
    children: [
      { id: "time-logs", label: "Time Logs" },
      { id: "shift-schedule", label: "Shift Schedule" },
      { id: "punch", label: "Punch" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    children: [{ id: "mypayroll", label: "My Payroll" }],
  },
  {
    id: "leaves",
    label: "Leaves",
    children: [
      { id: "request-leave", label: "Request Leave" },
      { id: "approval-leaves", label: "Approval Leaves" },
    ],
  },
];

// ── ORIGINAL SETTINGS ITEMS ──
const originalSettingsItems = [
  {
    id: "company",
    label: "Company",
    children: [
      { id: "companies", label: "Companies" },
      { id: "subscribers", label: "Subscribers" },
      { id: "subscription-plans", label: "Subscription Plans" },
    ],
  },
  {
    id: "departments",
    label: "Departments",
    children: [{ id: "departments", label: "Departments" }],
  },
  {
    id: "employees",
    label: "Employees",
    children: [
      { id: "employees", label: "Employees" },
      { id: "shifts-schedules", label: "Shifts Schedules" },
      { id: "locations", label: "Locations" },
      { id: "leave-requests", label: "Leave Requests" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    children: [{ id: "payroll", label: "Payroll" }],
  },
  {
    id: "subscription",
    label: "Subscription",
    children: [{ id: "mysubscription", label: "My Subscription" }],
  },
  {
    id: "preference",
    label: "Preference",
    children: [{ id: "appearance", label: "Appearance" }],
  },
];

// ── UTILITY FUNCTIONS TO SET LOCK STATES WITH REQUIRED PLAN ──

function getFeaturesWithLock(items, subscriptionPlan) {
  if (subscriptionPlan === "free") {
    // For Free plan, only allow Time Logs, Punch & Shift Schedule.
    const allowedIds = new Set(["time-logs", "punch", "shift-schedule"]);
    return items.map((group) => {
      if (group.children) {
        const newChildren = group.children.map((child) => {
          if (!allowedIds.has(child.id)) {
            return { ...child, locked: true, requiredPlan: "Basic" };
          }
          return { ...child, locked: false };
        });
        return { ...group, children: newChildren };
      }
      return group;
    });
  }
  // For Basic and Pro, all features are unlocked.
  return items.map((group) => {
    if (group.children) {
      const newChildren = group.children.map((child) => ({
        ...child,
        locked: false,
      }));
      return { ...group, children: newChildren };
    }
    return group;
  });
}

function getSettingsWithLock(items, subscriptionPlan, role) {
  let updated = [];
  if (subscriptionPlan === "free") {
    // For Free plan, only My Subscription and Appearance are allowed.
    updated = items.map((group) => {
      const newChildren = group.children.map((child) => {
        if (!["mysubscription", "appearance"].includes(child.id)) {
          return { ...child, locked: true, requiredPlan: "Basic" };
        }
        return { ...child, locked: false };
      });
      return { ...group, children: newChildren };
    });
  } else if (subscriptionPlan === "basic") {
    // For Basic, only "locations" in employees is locked.
    updated = items.map((group) => {
      if (group.id === "employees") {
        const newChildren = group.children.map((child) => {
          if (child.id === "locations") {
            return { ...child, locked: true, requiredPlan: "Pro" };
          }
          return { ...child, locked: false };
        });
        return { ...group, children: newChildren };
      }
      const newChildren = group.children.map((child) => ({
        ...child,
        locked: false,
      }));
      return { ...group, children: newChildren };
    });
  } else {
    // Pro plan: all settings are unlocked.
    updated = items.map((group) => {
      const newChildren = group.children.map((child) => ({
        ...child,
        locked: false,
      }));
      return { ...group, children: newChildren };
    });
  }

  // Apply role-based filtering (hiding whole groups)
  switch (role.toLowerCase()) {
    case "superadmin":
      return updated;
    case "admin":
      return updated.filter((group) => group.id !== "company");
    case "supervisor":
      return updated.filter(
        (group) => group.id === "departments" || group.id === "preference"
      );
    case "employee": // Also handle singular "employee"
    case "employees":
      return updated.filter((group) => group.id === "preference");
    default:
      return updated;
  }
}

// ── SIDEBAR USER INFO ──
function SidebarUserInfo({ user, subscriptionPlan }) {
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
    <div className="flex flex-col items-center mb-2 border-b p-2">
      <div className="flex justify-between items-center w-full">
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg  font-bold">
          {initials}
        </div>
        <div className="flex flex-col text-lg">
          <p className="font-semibold capitalize">{displayName}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-2">
        <p className="text-white text-sm text-center capitalize mt-1 p-2 cursor-pointer font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
          {subscriptionPlan}
        </p>
        <p className="text-neutral-600 font-semibold capitalize mt-1">
          {user.company.name}
        </p>
      </div>
      <div className="mt-2 text-center w-full text-sm">
        <div className="flex justify-between items-start  flex-col">
          <p className="text-neutral-500 mt-1 font-semibold">{user.email}</p>
          <p className="text-neutral-500 capitalize mt-1 font-semibold">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── COLLAPSIBLE NAV ITEM (FEATURES) ──
function CollapsibleNavItem({ item, activeNav, onNavChange }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li>
      <button
        onClick={() => setExpanded(!expanded)}
        className="block w-full text-left p-2 my-1 rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 flex justify-between items-center"
      >
        <span>{item.label}</span>
        <span>
          {expanded ? (
            <ChevronUp strokeWidth={2} />
          ) : (
            <ChevronDown strokeWidth={2} />
          )}
        </span>
      </button>
      {expanded && (
        <ul className="ml-4">
          {item.children.map((child) => (
            <li key={child.id}>
              <button
                onClick={() => {
                  if (!child.locked) onNavChange(child.id);
                }}
                disabled={child.locked}
                className={`flex justify-between items-center w-full text-left p-2 my-1 rounded-xl ${
                  activeNav === child.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold"
                    : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {child.label}
                {child.locked && (
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 cursor-pointer text-xs font-semibold text-white rounded-xl p-2 inline-flex items-center ml-1">
                    {child.requiredPlan}
                    <Lock strokeWidth={3} className="w-4 h-4 ml-1" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MainNavigation({ items, activeNav, onNavChange }) {
  return (
    <ul className="border p-1 py-2 rounded-xl">
      {items.map((item) =>
        item.children ? (
          <CollapsibleNavItem
            key={item.id}
            item={item}
            activeNav={activeNav}
            onNavChange={onNavChange}
          />
        ) : (
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
        )
      )}
    </ul>
  );
}

// ── COLLAPSIBLE SETTINGS ITEM (SETTINGS) ──
function CollapsibleSettingsItem({ item, activeNav, onNavChange }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li>
      <button
        onClick={() => setExpanded(!expanded)}
        className="block w-full text-left p-2 my-1 rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 flex justify-between items-center"
      >
        <span>{item.label}</span>
        <span>
          {expanded ? (
            <ChevronUp strokeWidth={2} />
          ) : (
            <ChevronDown strokeWidth={2} />
          )}
        </span>
      </button>
      {expanded && (
        <ul className="ml-4">
          {item.children.map((child) => (
            <li key={child.id}>
              <button
                onClick={() => {
                  if (!child.locked) onNavChange(child.id);
                }}
                disabled={child.locked}
                className={`flex justify-between items-center w-full text-left p-2 my-1 rounded-xl ${
                  activeNav === child.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold"
                    : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {child.label}
                {child.locked && (
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 font-semibold cursor-pointer text-xs text-white rounded-xl p-2 inline-flex items-center ml-1">
                    {child.requiredPlan}
                    <Lock strokeWidth={2} className="w-4 h-4 ml-1" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function SettingsMenu({ items, activeNav, onNavChange }) {
  return (
    <ul className="border py-2 px-1 rounded-xl">
      {items.map((item) => (
        <CollapsibleSettingsItem
          key={item.id}
          item={item}
          activeNav={activeNav}
          onNavChange={onNavChange}
        />
      ))}
    </ul>
  );
}

// ── COLLAPSIBLE SECTION ──
function CollapsibleSection({ title, children, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div className="mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center w-full p-1 font-semibold"
      >
        <span>{title}</span>
        <span>
          {expanded ? (
            <ChevronUp strokeWidth={2} className="w-5 h-5" />
          ) : (
            <ChevronDown strokeWidth={2} className="w-5 h-5" />
          )}
        </span>
      </button>
      {expanded && <div>{children}</div>}
    </div>
  );
}

// ── SIDEBAR COMPONENT ──
export default function Sidebar({ activeNav, onNavChange, user }) {
  const [collapsed, setCollapsed] = useState(false);
  const { subscription, setSubscription } = useAuthStore();

  // Always fetch the current subscription on mount
  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch(
          `/api/subscription/current?companyId=${user.company.id}`
        );
        const data = await res.json();
        if (
          data.subscription &&
          data.subscription.plan &&
          data.subscription.plan.name
        ) {
          setSubscription(data.subscription);
        } else {
          setSubscription(null);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setSubscription(null);
      }
    }
    if (user?.company?.id) {
      fetchSubscription();
    }
  }, [user, setSubscription]);

  // Derive the current subscription plan (default to "free")
  const subscriptionPlan = subscription?.plan?.name?.toLowerCase() || "free";

  // Process the original nav items to add a "locked" property and required plan.
  const featuresItems = getFeaturesWithLock(
    originalFeaturesItems,
    subscriptionPlan
  );
  const settingsItemsFiltered = getSettingsWithLock(
    originalSettingsItems,
    subscriptionPlan,
    user.role
  );

  return (
    <aside className="flex flex-col md:flex-row border-r relative text-sm">
      {/* Sidebar Content Column */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          collapsed ? "h-0 md:w-0" : "h-auto md:w-64"
        } w-full`}
      >
        <div className="p-4">
          <SidebarUserInfo user={user} subscriptionPlan={subscriptionPlan} />
          <CollapsibleSection title="Dashboard">
            <MainNavigation
              items={featuresItems}
              activeNav={activeNav}
              onNavChange={onNavChange}
            />
          </CollapsibleSection>
          <CollapsibleSection title={`Settings (${user.role})`}>
            <SettingsMenu
              items={settingsItemsFiltered}
              activeNav={activeNav}
              onNavChange={onNavChange}
            />
          </CollapsibleSection>
        </div>
      </div>
      {/* Toggle Button Column */}
      <div className="w-full md:w-8 flex-shrink-0 flex justify-center items-start border-b md:border-t-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {/* Desktop toggle: left/right arrows */}
          <span className="hidden md:block">
            {collapsed ? (
              <ArrowRight strokeWidth={2} className="w-6 h-6 text-orange-500" />
            ) : (
              <ArrowLeft strokeWidth={2} className="w-6 h-6 text-orange-500" />
            )}
          </span>
          {/* Mobile toggle: up/down arrows */}
          <span className="block md:hidden">
            {collapsed ? (
              <ArrowDown strokeWidth={2} className="w-6 h-6 text-orange-500" />
            ) : (
              <ArrowUp strokeWidth={2} className="w-6 h-6 text-orange-500" />
            )}
          </span>
        </button>
      </div>
    </aside>
  );
}
