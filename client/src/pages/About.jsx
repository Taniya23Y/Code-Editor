import React, { useEffect } from "react";
import ComparisonTable from "../components/Screens/HomePage/ComparisonTable";
import Testimonials from "../components/Screens/HomePage/Testimonials";
import Faq from "../components/commons/Faq";
import HeroAbout from "../components/Screens/AboutPage/HeroAbout";

const About = () => {
  const ScrollRestoration = () => {
    useEffect(() => {
      window.scrollTo(0, 0);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

    return null;
  };

  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white overflow-hidden">
      <ScrollRestoration />

      <main className="relative flex flex-col gap-12">
        <HeroAbout />
        <ComparisonTable />
        <Testimonials />
        <Faq />
      </main>
    </div>
  );
};

export default About;
