// biz-web-app/components/Partial/Footer.jsx

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
// 1) Import motion from framer-motion
import { motion } from "framer-motion";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission logic here
  };

  return (
    // 2) Replace <footer> with <motion.footer> to add animation
    <motion.footer
      className="w-full shadow-lg px-3"
      // 3) Simple fade/slide in on mount
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-center justify-center">
          {/* Left Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="BizBuddy Logo"
                width={200}
                height={60}
                className="w-48 sm:w-52 lg:w-56"
              />
            </div>
            <p className=" text-sm sm:text-base leading-relaxed">
              BizBuddy makes time management seamless and hassle-free. With a
              simple and intuitive experience, it keeps you organized and in
              control every step of the way.
            </p>
            <p className=" font-medium">Stay productive, stay efficient!</p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaTiktok, href: "#", label: "TikTok" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className=" hover:text-orange-500 transform hover:scale-110 transition-all duration-200"
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section - Help Navigation */}
          <div className="space-y-6">
            <h3 className=" font-semibold text-lg">Help</h3>
            <ul className="space-y-4">
              {[
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Terms of Service", href: "/terms" },
                { title: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className=" hover:text-orange-500 transition-colors duration-200 flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div className="space-y-6 border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl p-2 ">
            <div className=" p-6 rounded-xl shadow-sm">
              <h3 className=" font-bold text-2xl mb-4">
                Subscribe to Our Newsletter
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 text-sm pl-3 border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 dark:bg-black"
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block  text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 text-sm pl-3 border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 dark:bg-black"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className=" bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600  font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center text-sm ">
            Powered By:{" "}
            <span className="font-semibold ml-1 ">Bizsolutions LLC</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
