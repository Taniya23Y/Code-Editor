import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-1.5 sm:gap-2 relative z-10 group"
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <div className="absolute inset-0 bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg rotate-45 transform origin-center group-hover:scale-105 transition-transform" />
        <div className="absolute inset-[2.5px] sm:inset-0.75 bg-black rounded-lg flex items-center justify-center text-white font-bold">
          {"{ }"}
        </div>
      </div>

      <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
        Code.compiler
      </span>
    </Link>
  );
};

export default Logo;
