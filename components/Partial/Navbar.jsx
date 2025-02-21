// biz-web-app/components/Partial/Navbar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../Theme/ThemeToggle";
import useAuthStore from "@/store/useAuthStore";
import UserMenu from "./Navbar/UserMenu";
import MobileMenu from "./Navbar/MobileMenu";

/** Simple array of main nav links to avoid repetition. */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

/**
 * Desktop-only nav links for Home, Pricing, FAQ, Contact.
 * Highlights active link in orange if pathname matches.
 */
function DesktopNavLinks({ pathname }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-1 py-1 transition-colors hover:text-orange-500
            ${pathname === link.href ? "text-orange-500" : ""}
          `}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

/** Sign-in button used in desktop view when user is NOT signed in. */
function SignInLink() {
  return (
    <Link
      href="/sign-in"
      className="py-2.5 px-4 font-semibold text-white rounded-xl text-sm  bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-orange-600  transition-colors ease-in-out "
    >
      Sign in
    </Link>
  );
}

export default function NavBar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 px-4 md:px-6 lg:rounded-full lg:mt-1 md:max-w-7xl  shadow-lg md:mx-auto ">
      <div className="mx-auto max-w-7xl md:px-4 px-2">
        {/* ------------------ Desktop view (md+) ------------------ */}
        <div className="hidden md:flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/">
            <img
              src="/logo.png"
              alt="Bizbuddy title and logo"
              width={110}
              height={40}
            />
          </Link>

          {/* Right side: Theme toggle, main links, and sign in/user menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Always show main nav links, whether user is signed in or not */}
            <DesktopNavLinks pathname={pathname} />

            {/* Conditionally show Sign in or UserMenu */}
            {!user ? <SignInLink /> : <UserMenu />}
          </div>
        </div>

        {/* ------------------ Mobile view (< md) ------------------ */}
        <div className="md:hidden">
          {/* Top row: Logo, ThemeToggle, MobileMenu, Sign in/UserMenu */}
          <div className="flex items-center justify-between h-14 ">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Bizbuddy title and logo"
                width={100}
                height={25}
              />
            </Link>

            <div className="flex items-center">
              <ThemeToggle />
              {/* MobileMenu with 4 main links in a dropdown */}
              <MobileMenu />

              {/* Conditionally show Sign in or UserMenu */}
              {!user ? (
                <Link
                  href="/sign-in"
                  className="py-2 px-4 font-semibold text-white rounded-xl text-sm  bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-orange-600  transition-colors ease-in-out "
                >
                  Sign in
                </Link>
              ) : (
                <UserMenu />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
