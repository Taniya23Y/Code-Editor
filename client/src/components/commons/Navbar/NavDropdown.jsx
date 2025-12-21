import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

const NavDropdown = ({
  label,
  items,
  baseHref,
  id,
  isMobile = false,
  className,
  activeDropdown,
  setActiveDropdown,
}) => {
  const isOpen = activeDropdown === id;
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setActiveDropdown]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === "Escape" && isOpen) {
      setActiveDropdown(null);
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (activeDropdown === id) setActiveDropdown(null);
    }, 150);
  };

  const toggleDropdown = () => {
    setActiveDropdown(isOpen ? null : id);
  };

  const mobileStyles = isMobile
    ? {
        wrapper: "border-b border-white/10 pb-2",
        button:
          "flex items-center justify-between w-full py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-md px-2",
        content: "pl-2 mt-1 space-y-0.5 animate-fadeIn",
        item: "block py-1.5 px-3 text-white/70 hover:text-[#6EB4FC] hover:bg-white/5 rounded-lg transition-colors active:bg-white/15",
      }
    : {
        wrapper: "relative",
        button:
          "flex items-center gap-1 text-white/80 hover:text-[#6EB4FC] transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 text-sm lg:text-base",
        content:
          "absolute top-full left-0 mt-1 w-64 bg-black/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-xl p-3 animate-fadeIn",
        item: "flex items-center px-4 py-2.5 hover:bg-white/10 rounded-lg transition-colors",
      };

  return (
    <div
      className={cn(mobileStyles.wrapper, className)}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={mobileStyles.button}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span
          className={isMobile ? "font-medium cursor-pointer" : "cursor-pointer"}
        >
          {label}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200 cursor-pointer",
            isOpen && "rotate-180",
            !isMobile && "ml-1"
          )}
        />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={mobileStyles.content}>
          {items.map((item) => {
            const href = baseHref || "#";

            return (
              <Link key={item} to={href} className={mobileStyles.item}>
                <span className="font-medium text-sm">{item}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
