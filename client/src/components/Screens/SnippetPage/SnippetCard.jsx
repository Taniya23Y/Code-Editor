/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Trash2, User, Eye, Star, Code2, Globe } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SnippetCard = ({ snippet, user }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const isWeb = snippet.source === "web";

  const snippetLink = isWeb
    ? `/live-preview/${snippet._id}`
    : `/editor?code=${snippet._id}`;

  const previewText = isWeb
    ? snippet.fullCode?.html?.slice(0, 180) || "<html>...</html>"
    : snippet.sourceCode?.slice(0, 180) || "";

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link to={snippetLink} className="block h-full">
        <div className="relative h-full rounded-2xl border border-[#2a2a3d] bg-linear-to-br from-[#12121a] to-[#0b0b12] p-5 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                ${
                  isWeb
                    ? "bg-purple-500/15 text-purple-400"
                    : "bg-blue-500/15 text-blue-400"
                }`}
            >
              {isWeb ? <Globe size={12} /> : <Code2 size={12} />}
              {isWeb ? "WEB PROJECT" : snippet.language.toUpperCase()}
            </span>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                {snippet.views ?? 0}
              </div>

              {isWeb && (
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  {snippet.starCount ?? 0}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition">
            {snippet.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <User size={12} />
              {snippet.ownerName}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {new Date(snippet.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="relative rounded-lg bg-black/40 p-4 font-mono text-xs text-gray-300 line-clamp-4">
            {previewText}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-60" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SnippetCard;
