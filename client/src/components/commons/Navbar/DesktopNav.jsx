import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { Button } from "../Buttons";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";
import { logoutState } from "../../../redux/features/auth/authSlice";

const DesktopNav = () => {
  const [activeDropdown, setActiveDropDown] = useState(null);
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
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* MAIN NAV */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link
          to="/"
          className="text-white/80 hover:text-[#6EB4FC] transition py-2"
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
          setActiveDropdown={setActiveDropDown}
        />

        <NavDropdown
          id="editors"
          label="Editors"
          baseHref="/editor"
          items={editorsItems}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropDown}
        />

        <Link
          to="/developer-snippet"
          className="text-white/80 hover:text-[#6EB4FC] transition py-2"
          onMouseEnter={() => setActiveDropDown(null)}
        >
          Developer-Snippet
        </Link>

        <Link
          to="/aboutus"
          className="text-white/80 hover:text-[#6EB4FC] transition py-2"
          onMouseEnter={() => setActiveDropDown(null)}
        >
          About Us
        </Link>
      </nav>

      <div
        className="hidden md:flex items-center gap-4 relative"
        onMouseEnter={() => setActiveDropDown(null)}
      >
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <Button className="px-4 cursor-pointer font-semibold text-white/90 hover:text-[#6EB4FC] hover:bg-white/10">
                Log in
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="px-4 cursor-pointer font-semibold bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-white shadow-lg hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <div className="relative">
            {/* Avatar */}
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
      </div>
    </>
  );
};

export default DesktopNav;
