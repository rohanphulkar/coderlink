import CTA from "@/components/CTA/CTA";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import Pricing from "@/components/Pricing/Pricing";
import React from "react";

const page: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
};

export default page;
