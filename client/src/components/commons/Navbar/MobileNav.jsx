import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { cn } from "../../../utils/cn";
import { Button } from "../Buttons";
import { useSelector } from "react-redux";

const MobileNav = ({ isOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);

  const livePreviewItems = [
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

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 top-15 bg-black/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-3 py-4 flex flex-col gap-2 transition-all duration-300 overflow-y-auto",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}
      >
        {/* Links */}
        <Link
          to="/"
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 text-white hover:text-[#6EB4FC] rounded-md transition-colors active:bg-white/10"
        >
          Home
        </Link>

        <NavDropdown
          id="mobileLivePreviewItems"
          label="Live-Preview"
          baseHref="/live-preview"
          items={livePreviewItems}
          isMobile
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

        <NavDropdown
          id="mobileEditor"
          label="Editors"
          baseHref="/editor"
          items={editorsItems}
          isMobile
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

        <Link
          to="/aboutus"
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 text-white hover:text-[#6EB4FC] rounded-md transition-colors active:bg-white/10"
        >
          About Us
        </Link>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-3">
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-10 border-white/20 cursor-pointer text-white hover:bg-white/10 hover:text-[#6EB4FC] active:bg-white/20 w-full"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="h-10 w-full cursor-pointer bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-white border-0 shadow-lg shadow-indigo-500/20 active:opacity-90">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
