import React from "react";
import Hero from "../components/Screens/HomePage/Hero";
import WorkFlow from "../components/Screens/HomePage/WorkFlow";
import Features from "../components/Screens/HomePage/Features";
import ProgrammingLangSupport from "../components/Screens/HomePage/ProgrammingLangSupport";
import ComparisonTable from "../components/Screens/HomePage/ComparisonTable";
import Testimonials from "../components/Screens/HomePage/Testimonials";
import Faq from "../components/commons/Faq";

const Home = () => {
  return (
    <section className="relative min-h-svh flex items-center pt-16 sm:pt-20 overflow-hidden bg-black">
      <div className="container mx-auto flex flex-col gap-2">
        <Hero />
        <ProgrammingLangSupport />
        <Features />
        <WorkFlow />
        <ComparisonTable />
        <Testimonials />
        <Faq />
      </div>
    </section>
  );
};

export default Home;
