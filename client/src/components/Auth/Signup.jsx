/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../assets/images/SignupImage.png";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Last name is required"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers & underscores allowed")
      .required("Username is required"),
    developerType: Yup.string().required("Developer type is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              developerType: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await registerUser(values).unwrap();

                toast.success(
                  res.message || "Account created! Check your email for OTP."
                );

                resetForm();
                navigate("/verify-email", { state: { email: values.email } });
              } catch (error) {
                toast.error(error?.data?.message || "Registration failed!");
                console.error(error);
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <Field
                      name="firstName"
                      className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                      placeholder="John"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <Field
                      name="lastName"
                      className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                      placeholder="Doe"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Username</label>
                  <Field
                    name="username"
                    className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                    placeholder="john_dev"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Developer Type</label>
                  <Field
                    as="select"
                    name="developerType"
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
                  </Field>
                  <ErrorMessage
                    name="developerType"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#67BCFF] outline-none"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-[#1c1c1c] border border-gray-700 focus:ring-2 focus:ring-[#9C9EFF] outline-none pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer top-12 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 cursor-pointer bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg text-black font-semibold"
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-[#67BCFF]">
              Login here
            </Link>
          </div>

          <p className="text-center text-xs mt-3 text-gray-400 hover:text-gray-600 transition">
            <Link to="/">← Back to Home</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
