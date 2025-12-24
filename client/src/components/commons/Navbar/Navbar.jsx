import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";
import { logoutState } from "../../../redux/features/auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logoutState());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 cursor-pointer h-10 rounded-full bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] flex items-center justify-center text-white font-bold uppercase"
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-full h-full rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  user?.firstName?.[0]?.toUpperCase() || "U"
                )}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-[#111] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-left px-4 py-3 text-sm text-red-400 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Menu */}
          <button
            className="h-11 w-11 flex items-center justify-center text-white hover:text-[#67BCFF] rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-7 w-7 cursor-pointer" />
            ) : (
              <Menu className="h-7 w-7 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <MobileNav isOpen={isMenuOpen} />
    </header>
  );
};

export default Navbar;
