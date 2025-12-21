/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import signupImage from "../../assets/images/SignupImage.png";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully! 🎉");
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-black text-white">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <img
          src={signupImage}
          alt="Developer Signup"
          className="max-w-full h-auto object-contain rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111] rounded-2xl shadow-lg shadow-black/40 p-8 border border-white/10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Join{" "}
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Code.Compiler
            </span>
          </h1>

          <p className="text-gray-400 text-center mb-6 text-sm">
            Enroll to start writing, compiling, and sharing your code with other
            developers worldwide.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Username <span className="text-gray-400">(Unique)</span>
              </label>
              <input
                type="text"
                required
                placeholder="john_dev"
                pattern="^[a-zA-Z0-9_]+$"
                className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#9C9EFF] outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Letters, numbers, and underscores only.
              </p>
            </div>

            <div>
              <label className="block text-sm mb-1">Developer Type</label>
              <select
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#9C9EFF] outline-none text-gray-300"
              >
                <option value="">Select type</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full-Stack Developer</option>
                <option>Python Developer</option>
                <option>Java Developer</option>
                <option>Student / Beginner</option>
                <option>Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg font-semibold text-black hover:opacity-90 transition"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-[#67BCFF]">
              Login here
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
