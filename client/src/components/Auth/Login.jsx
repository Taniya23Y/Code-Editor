/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import loginImage from "../../assets/images/loginImage.png";
import Logo from "../commons/Logo";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    if (user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <img
          src={loginImage}
          alt="Login"
          className="max-w-full h-auto rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111] rounded-2xl p-8 border border-white/10 shadow-xl"
        >
          <div className="flex justify-center mb-5">
            <Logo />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
            Welcome Back to{" "}
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Code.Compiler
            </span>
          </h1>

          <p className="text-gray-400 text-center mb-7 text-sm">
            Sign in to continue coding and manage your projects.
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await loginUser(values).unwrap();
                toast.success(res.message || "Login successful!");
                resetForm();
              } catch (error) {
                toast.error(error?.data?.message || "Invalid credentials");
              }
            }}
          >
            {() => (
              <Form className="space-y-5">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-3 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3 text-gray-400" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#9C9EFF] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-3 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />

                  <div className="text-right mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#67BCFF] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer py-3 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg font-semibold text-black hover:opacity-90 transition disabled:opacity-60"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6 text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#67BCFF] hover:underline">
              Create one
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
