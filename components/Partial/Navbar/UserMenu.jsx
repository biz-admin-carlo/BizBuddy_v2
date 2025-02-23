// File: biz-web-app/components/Partial/Navbar/UserMenu.jsx
"use client";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import useAuthStore from "@/store/useAuthStore";

export default function UserMenu() {
  const { token, logout } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (token) {
      fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setProfile(data.user);
        })
        .catch((err) => console.error("Failed to fetch user profile:", err));
    }
  }, [token]);
  if (!profile) return null;
  const firstInitial = profile.profile?.firstName
    ? profile.profile.firstName.charAt(0)
    : "";
  const lastInitial = profile.profile?.lastName
    ? profile.profile.lastName.charAt(0)
    : "";
  const initials = (firstInitial + lastInitial).toUpperCase() || "?";
  return (
    <div className="relative pl-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 flex items-center justify-center text-sm font-semibold focus:outline-none border-2 p-1 rounded-full transition-colors ${
          isOpen
            ? "text-orange-500 border-orange-500"
            : "text-current border-neutral-800 dark:border-neutral-400"
        } hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500`}
      >
        {initials}
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-black border rounded-md shadow-lg z-10">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              {profile.profile?.firstName} {profile.profile?.lastName}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {profile.email}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {profile.username}
            </p>
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-2 block w-full text-left px-4 py-2 text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
