/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Code2, Star, Calendar } from "lucide-react";
import { useGetPublicProfileQuery } from "@/redux/features/auth/authApi";

const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetPublicProfileQuery(username);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Profile not found
      </div>
    );
  }

  const { user, stats, editorCodes = [], liveCodes = [] } = data;

  return (
    <section className="min-h-screen bg-black text-white">
      {/* Banner */}
      <div className="relative h-64 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 -mt-24">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-linear-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold">
              {user.firstName?.charAt(0)}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-400">@{user.username}</p>
              <p className="text-sm mt-1 text-purple-400">
                {user.developerType}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Stat
              icon={<Code2 />}
              label="Editor Codes"
              value={stats.editorCount}
            />
            <Stat
              icon={<Star />}
              label="Live Projects"
              value={stats.liveCount}
            />
            <Stat icon={<Eye />} label="Total Views" value={stats.totalViews} />
            <Stat
              icon={<Calendar />}
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </motion.div>

        {/* Live Projects */}
        <Section title="Live Preview Projects">
          {liveCodes.map((c) => (
            <CodeCard
              key={c._id}
              title={c.title}
              type="Live Project"
              icon={<Star size={16} />}
              value={c.starCount || 0}
              createdAt={c.createdAt}
              previewCode={
                c.html?.slice(0, 300) ||
                c.code?.slice(0, 300) ||
                "// No preview available"
              }
              onClick={() => navigate(`/live-preview/${c._id}`)}
            />
          ))}
        </Section>

        {/* Editor Codes */}
        <Section title="Editor Snippets">
          {editorCodes.map((c) => (
            <CodeCard
              key={c._id}
              title={c.title}
              type="Editor Snippet"
              icon={<Eye size={16} />}
              value={c.views || 0}
              createdAt={c.createdAt}
              previewCode={
                c.sourceCode?.slice(0, 300) || "// No preview available"
              }
              onClick={() => navigate(`/editor/${c._id}`)}
            />
          ))}
        </Section>
      </div>
    </section>
  );
};

export default PublicProfile;

/* ---------- Components ---------- */

const Stat = ({ icon, label, value }) => (
  <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-center">
    <div className="text-purple-400 mb-1">{icon}</div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-14">
    <h2 className="text-2xl font-semibold mb-5">{title}</h2>
    {children?.length ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    ) : (
      <p className="text-gray-500">No public content available.</p>
    )}
  </div>
);

const CodeCard = ({
  title,
  type,
  icon,
  value,
  createdAt,
  onClick,
  previewCode,
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.03 }}
    onClick={onClick}
    className="cursor-pointer bg-[#111] border border-white/10 rounded-2xl overflow-hidden
               hover:border-purple-500/60 transition"
  >
    {/* Preview */}
    <div className="relative h-32 bg-black overflow-hidden">
      <pre className="h-full p-3 text-xs text-green-400/80 whitespace-pre-wrap wrap-break-words select-none">
        {previewCode}
      </pre>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
    </div>

    {/* Info */}
    <div className="p-5">
      <h3 className="font-semibold truncate">{title || "Untitled Code"}</h3>
      <p className="text-xs text-gray-500 uppercase mt-1">{type}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          {icon}
          <span>{value}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);
