// biz-web-app/components/Partial/Navbar/UserMenu.jsx

"use client";

import { useState } from "react";
import { Transition } from "@headlessui/react";
import useAuthStore from "@/store/useAuthStore";

export default function UserMenu() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const firstInitial = user.profile?.firstName?.charAt(0);
  const lastInitial = user.profile?.lastName?.charAt(0);
  const initials = `${firstInitial}${lastInitial}`.toUpperCase() || "?";

  return (
    <div className="relative pl-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 flex items-center justify-center text-sm font-semibold 
          focus:outline-none border-2  rounded-full transition-colors
          ${
            isOpen
              ? "text-orange-500 border-orange-500 border-2"
              : "border-2 border-gray-800 dark:border-gray-400"
          } 
          hover:text-orange-500 hover:border-orange-500
        `}
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
          <div className="px-4 py-2 border-b ">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {user.profile?.firstName || user.firstName}{" "}
              {user.profile?.lastName || user.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-2 block w-full text-left px-4 py-2 text-sm "
            >
              Sign Out
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
