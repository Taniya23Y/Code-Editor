/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, Calendar, LogOut } from "lucide-react";
import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutState } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import UserSavedCodes from "../Screens/compilerPage/UserSavedCodes";
import UserSavedEditorCodes from "../Screens/codeRunnerPage/UserSavedEditorCodes";

const UserProfileDashboard = () => {
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
        Loading dashboard...
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
    <section className="min-h-screen bg-black text-white">
      <div className="h-56 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 relative" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative -mt-24 mx-auto max-w-6xl px-4"
      >
        <div className="bg-[#111] border border-white/10 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-linear-to-tr from-[#67BCFF] to-[#CB86FF] flex items-center justify-center text-black text-4xl font-bold">
              {user?.firstName?.charAt(0)}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-400">@{user.username}</p>
              <p className="mt-1 text-sm text-indigo-400">
                {user.developerType}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 cursor-pointer py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 transition"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Stat icon={<Mail />} label="Email" value={user.email} />
            <Stat
              icon={<ShieldCheck />}
              label="Verified"
              value={user.isVerified ? "Yes" : "No"}
            />
            <Stat icon={<User />} label="Role" value={user.role} />
            <Stat
              icon={<Calendar />}
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 mt-14 space-y-14">
        <section>
          <h3 className="text-2xl font-bold mb-4">🧪 Live Preview Projects</h3>
          <UserSavedCodes />
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">💻 Editor Saved Codes</h3>
          <UserSavedEditorCodes />
        </section>
      </div>
    </section>
  );
};

export default UserProfileDashboard;

const Stat = ({ icon, label, value }) => (
  <div className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-center gap-4">
    <div className="text-indigo-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  </div>
);
