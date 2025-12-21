import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { Button } from "../Buttons";

const DesktopNav = () => {
  const [activeDropdown, setActiveDropDown] = useState(null);

  const featuresItems = [
    "Save Code",
    "Download Code",
    "Load Code",
    "Edit Code",
    "Delete",
  ];

  const editorsItems = [
    "Code Snippets",
    "Share Code",
    "Run Code",
    "Syntax Highlighting",
    "Language Selection",
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropDown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleActiveDropdown = (id) => {
    setActiveDropDown(id);
  };

  return (
    <>
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link
          to="/"
          className="text-white/80 hover:text-[#6EB4FC] transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
          onMouseEnter={() => setActiveDropDown(null)}
        >
          Home
        </Link>

        <NavDropdown
          id="live-preview"
          label="Live-Preview"
          baseHref="/live-preview"
          items={featuresItems}
          activeDropdown={activeDropdown}
          setActiveDropdown={handleActiveDropdown}
        />

        <NavDropdown
          id="editors"
          label="Editors"
          baseHref="/editor"
          items={editorsItems}
          activeDropdown={activeDropdown}
          setActiveDropdown={handleActiveDropdown}
        />

        <Link
          to="/developer-snippet"
          className="text-white/80 hover:text-[#6EB4FC] transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
          onMouseEnter={() => setActiveDropDown(null)}
        >
          Developer-Snippet
        </Link>

        <Link
          to="/aboutus"
          className="text-white/80 hover:text-[#6EB4FC] transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base"
          onMouseEnter={() => setActiveDropDown(null)}
        >
          About Us
        </Link>
      </nav>

      <div
        className="hidden md:flex items-center gap-2 lg:gap-4"
        onMouseEnter={() => setActiveDropDown(null)}
      >
        <Link to="/login">
          <Button className="text-sm lg:text-base px-3 lg:px-4 font-semibold cursor-pointer border-0 text-white/90 hover:text-[#6EB4FC] hover:bg-white/10 transition-all">
            Log in
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="text-sm lg:text-base px-3 lg:px-4 font-semibold border-0 cursor-pointer transition-all bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-white hover:text-black shadow-lg shadow-indigo-500/30 hover:opacity-90">
            Get Started
          </Button>
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
