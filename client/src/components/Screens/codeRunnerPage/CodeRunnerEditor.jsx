/* eslint-disable no-unused-vars */
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { CODE_RUNNER_LANGUAGES } from "@/utils/codeRunnerLanguages";
import { CODE_TEMPLATES } from "@/utils/codeTemplates";
import {
  Settings,
  RotateCcw,
  Download,
  Share2,
  Copy,
  Save,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useSaveLanguageCodeMutation,
  useGetLanguageCodeQuery,
} from "@/redux/features/codeRunner/languageCodeApi";
import { toast } from "react-toastify";

const CodeRunnerEditor = ({ onRun, input = "" }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const codeId = urlParams.get("code"); // get code id from URL

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(CODE_TEMPLATES["python"]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [savedId, setSavedId] = useState(codeId || null);

  const selectedLang = CODE_RUNNER_LANGUAGES.find((l) => l.id === language);

  const { data: fetchedCode, isLoading } = useGetLanguageCodeQuery(codeId, {
    skip: !codeId,
  });

  useEffect(() => {
    if (fetchedCode?.success && fetchedCode?.code) {
      setLanguage(fetchedCode.code.language);
      setCode(fetchedCode.code.sourceCode);
    }
  }, [fetchedCode]);

  const [saveLanguageCode, { isLoading: isSaving }] =
    useSaveLanguageCodeMutation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(CODE_TEMPLATES[lang] || "");
  };

  const handleReset = () => {
    setCode(CODE_TEMPLATES[language] || "");
    setOpenMenu(false);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const ext = selectedLang.extension || "txt";

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code.${ext}`;
    link.click();

    setOpenMenu(false);
  };

  const handleSave = async () => {
    try {
      const res = await saveLanguageCode({
        title: "My Code Runner Snippet",
        language,
        sourceCode: code,
        input,
        isPublic: true,
      }).unwrap();

      setSavedId(res.id);
      setOpenShare(true);
      setOpenMenu(false);

      toast.success("Code saved successfully!");
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const shareUrl = savedId
    ? `${window.location.origin}/editor?code=${savedId}`
    : "";

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] relative">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#222]">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-[#111] text-white px-3 py-1 rounded"
        >
          {CODE_RUNNER_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setOpenMenu((p) => !p)}
            className="p-2 cursor-pointer rounded bg-blue-400 hover:bg-blue-300"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={() => onRun(code, language)}
            className="bg-green-600 cursor-pointer px-4 py-1 rounded text-white hover:bg-green-700"
          >
            Run
          </button>

          {openMenu && (
            <div className="absolute right-0 top-10 bg-[#111] border border-[#333] rounded w-48 z-50">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-[#222]"
              >
                <RotateCcw size={16} /> Reset Code
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-[#222]"
              >
                <Download size={16} /> Download Code
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-3 py-2 w-full text-green-400 hover:bg-[#222]"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Code"}
              </button>

              <button
                onClick={() => {
                  if (!savedId) {
                    toast.error("Please save code first");
                    return;
                  }
                  setOpenShare(true);
                  setOpenMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-[#222]"
              >
                <Share2 size={16} /> Share Code
              </button>
            </div>
          )}
        </div>
      </div>

      <Editor
        height="100%"
        theme="vs-dark"
        language={selectedLang.monaco}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      <Dialog open={openShare} onOpenChange={setOpenShare}>
        <DialogContent className="bg-[#111] border border-[#333]">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Share your Code
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Share your code with this URLId to your Fellow-Developers
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mt-3">
            <input
              disabled
              value={shareUrl}
              className="w-full p-2 rounded bg-black text-green-400"
            />
            <button
              onClick={copyShareUrl}
              className="bg-blue-600 px-3 rounded text-white"
            >
              <Copy size={16} />
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-2">
            Anyone with this link can view your code
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeRunnerEditor;
