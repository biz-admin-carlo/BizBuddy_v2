// File: biz-web-app/app/page.jsx

"use client";
import LandingHero from "@/components/Home/LandingHero";
import FeaturesIcon from "@/components/Home/FeaturesIcon";
import KeyFeatures from "@/components/Home/KeyFeatures";
import Testimonials from "@/components/Home/Testimonials";
import DataDisplay from "@/components/Home/DataDisplay";
import TrustedPartners from "@/components/Home/TrustedPartners";
import Contact from "@/components/Home/Contact";
import Accordion from "@/components/Home/Accordion";
import Footer from "@/components/Partial/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full md:pt-16 lg:pt-18 pt-10">
      <LandingHero />
      <FeaturesIcon />
      <KeyFeatures />
      <Testimonials />
      <DataDisplay />
      <TrustedPartners />
      <Contact />
      <Accordion />
      <Footer />
    </div>
  );
}
