import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../Logo";
import { cn } from "../../../utils/cn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-15 flex items-center",
        scrolled
          ? "bg-[#1d1d1d] backdrop-blur-lg shadow-lg shadow-black/20 border-white/10"
          : "bg-black"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        <DesktopNav />

        <button
          className="md:hidden h-14 w-14 cursor-pointer flex items-center justify-center text-white hover:text-[#67BCFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>
      </div>

      <MobileNav isOpen={isMenuOpen} />
    </header>
  );
};

export default Navbar;
