// File: biz-web-app/app/(home)/contact/page.jsx

"use client";

import Contact from "@/components/Home/Contact";
import Footer from "@/components/Partial/Footer";
import React from "react";

function page() {
  return (
    <div className="flex flex-col">
      <Contact className="" />
      <Footer />
    </div>
  );
}

export default page;
