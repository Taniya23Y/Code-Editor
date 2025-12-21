/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import loginImage from "../../assets/images/loginImage.png";
import Logo from "../commons/Logo";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login Successfully!");
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-black text-white">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <img
          src={loginImage}
          alt="Developer Login"
          className="max-w-full h-auto object-contain rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-1">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#111] rounded-2xl shadow-lg shadow-black/40 p-6 border border-white/10"
        >
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Welcome Back to{" "}
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Code.Compiler
            </span>
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Sign in to continue coding and access your saved projects.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#67BCFF] placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#9C9EFF] outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-12 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg font-semibold text-black shadow-lg hover:opacity-90 transition cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
            <Link to="/forgot-password" className="hover:text-[#67BCFF]">
              Forgot Password?
            </Link>
            <Link to="/signup" className="hover:text-[#67BCFF]">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
