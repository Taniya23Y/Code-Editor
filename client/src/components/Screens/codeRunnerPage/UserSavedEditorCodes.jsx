/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Eye, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetMyLanguageCodesQuery } from "@/redux/features/codeRunner/languageCodeApi";

const UserSavedEditorCodes = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetMyLanguageCodesQuery();

  const codes = data?.data || [];

  if (isLoading) {
    return (
      <div className="w-full text-center text-white py-10">
        Loading editor saved codes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-center text-red-500 py-10">
        {error?.data?.message || "Failed to load editor saved codes"}
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="w-full text-center text-gray-400 py-10">
        You have not saved any editor code yet.
      </div>
    );
  }

  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {codes.map((code) => (
        <motion.div
          key={code._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111] border border-white/10 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(`/editor?code=${code._id}`)}
        >
          <div className="bg-gray-900 p-3">
            <pre className="text-xs text-green-400 h-24 overflow-auto rounded bg-gray-800 p-2">
              {code.sourceCode
                ? code.sourceCode.slice(0, 200)
                : "// No code available"}
            </pre>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold truncate">
              {code.title || "Untitled Code"}
            </h3>

            <p className="text-gray-400 text-sm">
              Language:{" "}
              <span className="text-white capitalize">{code.language}</span>
            </p>

            <p className="text-gray-400 text-sm">
              Owner: {code.ownerName || "You"}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-blue-400">
                <Code2 size={16} />
                <span className="text-xs uppercase">Editor</span>
              </div>

              <div className="flex items-center gap-1 text-red-500">
                <Eye size={16} />
                <span>{code.views || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserSavedEditorCodes;
