/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import signupImage from "../../assets/images/SignupImage.png";

import { toast } from "react-toastify";
import { useVerifyUserMutation } from "../../redux/features/auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate("/signup");
    return null;
  }

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers allowed")
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
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
            Code.Compiler
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Email Verification
            </span>
          </h1>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={OtpSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const payload = { email, otp: values.otp.trim() };

                const res = await verifyUser(payload).unwrap();
                toast.success(res.message || "Email Verified Successfully!");

                resetForm();

                navigate("/login");
              } catch (error) {
                toast.error(error?.data?.message || "OTP verification failed!");
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative text-center">
                  <label className="block mb-1 font-medium text-gray-700">
                    Enter 6-Digit OTP
                  </label>

                  <Field
                    type="text"
                    name="otp"
                    maxLength={6}
                    placeholder="******"
                    className="w-full tracking-[0.6em] text-center text-lg font-bold py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />

                  <ErrorMessage
                    name="otp"
                    component="p"
                    className="text-red-500 text-xs mt-1 text-left"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-linear-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6 text-sm text-gray-400">
            Didn't receive code?{" "}
            <button className="text-blue-600 font-medium cursor-pointer hover:underline">
              Resend OTP
            </button>
          </div>

          <p className="text-center text-xs mt-3 text-gray-400 hover:text-gray-600 transition">
            <Link to="/">← Back to Home</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VerifyEmail;
