// File: biz-web-app/app/layout.jsx
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import NavBar from "@/components/Partial/Navbar";

export const metadata = {
  title: "BizBuddy",
  description: "BizBuddy web application for time-keeping, payroll and leaves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NavBar />
          <main className="pt-16 ">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
