/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutState } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import UserSavedCodes from "../Screens/compilerPage/UserSavedCodes";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetProfileQuery();
  const [logoutUser] = useLogoutUserMutation();

  const user = data?.user;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logoutState());
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error?.data?.message || "Failed to load profile"}
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-20 bg-black text-white flex items-center justify-center flex-col gap-3 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-[#111] border border-white/10 rounded-2xl shadow-lg p-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] flex items-center justify-center text-black text-3xl font-bold">
            {user?.firstName?.charAt(0)}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-400">@{user.username}</p>
            <p className="text-sm mt-1">{user.developerType}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="Role" value={user.role} />
          <ProfileItem
            label="Email Verified"
            value={user.isVerified ? "Yes ✅" : "No ❌"}
          />
          <ProfileItem
            label="Account Status"
            value={user.isActive ? "Active 🟢" : "Disabled 🔴"}
          />
          <ProfileItem
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <ProfileItem
            label="Last Login"
            value={
              user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"
            }
          />
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 cursor-pointer rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            <Link to="/">← Back to Home</Link>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </motion.div>

      <UserSavedCodes />
    </section>
  );
};

export default UserProfile;

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
