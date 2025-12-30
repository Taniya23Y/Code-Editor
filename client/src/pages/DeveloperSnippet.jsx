/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Search, Grid, Layers, X, Code, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SnippetCard from "@/components/Screens/SnippetPage/SnippetCard";
import { useGetAllCodesQuery } from "@/redux/features/compiler/codeSlice";
import { useGetPublicCodesQuery } from "@/redux/features/codeRunner/languageCodeApi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DeveloperSnippet = () => {
  const { data: allCodes = [], isLoading: webLoading } = useGetAllCodesQuery();
  const { data: publicLangCodes, isLoading: langLoading } =
    useGetPublicCodesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [view, setView] = useState("grid");

  const normalizedWebCodes = useMemo(() => {
    return Array.isArray(allCodes)
      ? allCodes
          .filter((code) => code.isPublic)
          .map((code) => ({
            _id: code._id,
            title: code.title,
            language: code.language || "web",
            ownerName: code.ownerName,
            createdAt: code.createdAt,
            source: "web",
            fullCode: code.fullCode,
          }))
      : [];
  }, [allCodes]);

  const normalizedLangCodes = useMemo(() => {
    const langCodesArray = Array.isArray(publicLangCodes)
      ? publicLangCodes
      : publicLangCodes?.data || [];

    return langCodesArray.map((code) => ({
      _id: code._id,
      title: code.title,
      language: code.language,
      ownerName: code.ownerName,
      createdAt: code.createdAt,
      source: "language",
      fullCode: code.code,
    }));
  }, [publicLangCodes]);

  const snippets = useMemo(
    () => [...normalizedWebCodes, ...normalizedLangCodes],
    [normalizedWebCodes, normalizedLangCodes]
  );

  const languages = useMemo(
    () => [...new Set(snippets.map((s) => s.language || "web"))],
    [snippets]
  );

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const lang = snippet.language || "web";
      const matchesSearch =
        snippet.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.ownerName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = !selectedLanguage || lang === selectedLanguage;
      return matchesSearch && matchesLanguage;
    });
  }, [snippets, searchQuery, selectedLanguage]);

  if (webLoading || langLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading snippets...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-30 bg-black text-white p-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <h1
          className="text-6xl text-center
        font-bold mb-2"
        >
          Developer Snippets
        </h1>
        <p className="text-gray-400 text-center">
          Explore public code snippets & projects shared by developers
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, language or author"
            className="w-full pl-10 pr-4 py-3 bg-[#1e1e2e] rounded-lg border border-gray-800 focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 mb-8">
        {languages.map((lang) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={lang}
            onClick={() =>
              setSelectedLanguage(lang === selectedLanguage ? null : lang)
            }
            className={`px-3 py-1.5 rounded-lg text-sm transition
              ${
                selectedLanguage === lang
                  ? "bg-blue-500/20 text-blue-400 cursor-pointer"
                  : "bg-[#1e1e2e] text-gray-400 cursor-pointer hover:text-white"
              }`}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}

        {selectedLanguage && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedLanguage(null)}
            className="flex items-center gap-1 text-sm text-gray-400 ml-2"
          >
            <X size={14} /> Clear
          </motion.button>
        )}

        <div className="ml-auto flex bg-[#1e1e2e] rounded-lg p-1">
          {[
            { id: "grid", icon: Grid },
            { id: "list", icon: Layers },
          ].map(({ id, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.1 }}
              onClick={() => setView(id)}
              className={`p-2 rounded ${
                view === id
                  ? "bg-blue-500/20  cursor-pointer text-blue-400"
                  : "cursor-pointer text-gray-400"
              }`}
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className={`max-w-6xl mx-auto grid gap-6 ${
          view === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        <AnimatePresence>
          {filteredSnippets.map((snippet) => (
            <motion.div
              key={snippet._id}
              variants={itemVariants}
              layout
              whileHover={{ y: -6 }}
            >
              <SnippetCard snippet={snippet} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSnippets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-20 text-gray-400"
        >
          <Code size={40} className="mx-auto mb-4 opacity-50" />
          <p>No public snippets found</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DeveloperSnippet;
