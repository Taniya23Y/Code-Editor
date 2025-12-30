// /* eslint-disable no-unused-vars */
// import Editor from "@monaco-editor/react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { CODE_RUNNER_LANGUAGES } from "@/utils/codeRunnerLanguages";
// import { CODE_TEMPLATES } from "@/utils/codeTemplates";
// import {
//   Settings,
//   RotateCcw,
//   Download,
//   Share2,
//   Copy,
//   Save,
//   PencilLine,
// } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import {
//   useSaveLanguageCodeMutation,
//   useGetLanguageCodeQuery,
//   useUpdateLanguageCodeMutation,
//   useDeleteLanguageCodeMutation,
// } from "@/redux/features/codeRunner/languageCodeApi";
// import { toast } from "react-toastify";

// const CodeRunnerEditor = ({ onRun, input = "" }) => {
//   const navigate = useNavigate();
//   const urlParams = new URLSearchParams(window.location.search);
//   const codeId = urlParams.get("code");
//   const isEditMode = !!codeId;

//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState(CODE_TEMPLATES["python"]);
//   const [title, setTitle] = useState("My Code Runner Snippet");

//   const [openMenu, setOpenMenu] = useState(false);
//   const [openSaveDialog, setOpenSaveDialog] = useState(false);
//   const [openShareDialog, setOpenShareDialog] = useState(false);

//   const selectedLang = CODE_RUNNER_LANGUAGES.find((l) => l.id === language);

//   const { data: fetchedCode } = useGetLanguageCodeQuery(codeId, {
//     skip: !codeId,
//   });

//   const [saveLanguageCode, { isLoading: isSaving }] =
//     useSaveLanguageCodeMutation();
//   const [updateLanguageCode, { isLoading: isUpdating }] =
//     useUpdateLanguageCodeMutation();
//   const [deleteLanguageCode, { isLoading: isDeleting }] =
//     useDeleteLanguageCodeMutation();

//   // Replace this with your actual auth logic
//   const currentUserId = "CURRENT_USER_ID_HERE";

//   useEffect(() => {
//     if (fetchedCode?.success && fetchedCode?.code) {
//       setLanguage(fetchedCode.code.language);
//       setCode(fetchedCode.code.sourceCode);
//       setTitle(fetchedCode.code.title);
//     }
//   }, [fetchedCode]);

//   const handleLanguageChange = (e) => {
//     const lang = e.target.value;
//     setLanguage(lang);
//     setCode(CODE_TEMPLATES[lang] || "");
//   };

//   const handleReset = () => {
//     setCode(CODE_TEMPLATES[language] || "");
//     setOpenMenu(false);
//   };

//   const handleDownload = () => {
//     const blob = new Blob([code], { type: "text/plain" });
//     const ext = selectedLang.extension || "txt";

//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `code.${ext}`;
//     link.click();

//     setOpenMenu(false);
//   };

//   const handleSave = async () => {
//     if (!title.trim()) {
//       toast.error("Title is required");
//       return;
//     }

//     try {
//       if (isEditMode) {
//         await updateLanguageCode({
//           id: codeId,
//           title,
//           language,
//           sourceCode: code,
//           input,
//         }).unwrap();

//         toast.success("Code updated successfully!");
//       } else {
//         const res = await saveLanguageCode({
//           title,
//           language,
//           sourceCode: code,
//           input,
//           isPublic: true,
//         }).unwrap();

//         toast.success("Code saved successfully!");
//         navigate(`/editor?code=${res.id}`, { replace: true });
//       }

//       setOpenSaveDialog(false);
//     } catch (err) {
//       toast.error("Save failed");
//     }
//   };

//   const handleDelete = async () => {
//     if (fetchedCode?.code?.ownerId !== currentUserId) {
//       toast.error("Only the owner can delete this code!");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this code?")) return;

//     try {
//       await deleteLanguageCode(codeId).unwrap();
//       toast.success("Code deleted successfully!");
//       navigate("/"); // Redirect to home or editor list
//     } catch (err) {
//       toast.error("Failed to delete code");
//     }
//   };

//   const shareUrl = `${window.location.origin}/editor?code=${codeId}`;

//   return (
//     <div className="flex flex-col h-full bg-[#0d0d0d] relative">
//       <div className="flex items-center justify-between px-3 py-2 border-b border-[#222]">
//         <select
//           value={language}
//           onChange={handleLanguageChange}
//           className="bg-[#111] text-white px-3 py-1 rounded"
//         >
//           {CODE_RUNNER_LANGUAGES.map((lang) => (
//             <option key={lang.id} value={lang.id}>
//               {lang.label}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center gap-2 relative">
//           <button
//             onClick={() => setOpenSaveDialog(true)}
//             className="p-2 cursor-pointer rounded bg-green-600 text-white hover:bg-green-700"
//           >
//             {isEditMode ? <PencilLine size={18} /> : <Save size={18} />}
//           </button>

//           {isEditMode && (
//             <button
//               onClick={() => setOpenShareDialog(true)}
//               className="p-2 rounded cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
//             >
//               <Share2 size={18} />
//             </button>
//           )}

//           <button
//             onClick={() => setOpenMenu((p) => !p)}
//             className="p-2 rounded cursor-pointer bg-blue-400 hover:bg-blue-300"
//           >
//             <Settings size={18} />
//           </button>

//           <button
//             onClick={() => onRun(code, language)}
//             className="bg-green-600 cursor-pointer px-4 py-1 rounded text-white hover:bg-green-700"
//           >
//             Run
//           </button>

//           {openMenu && (
//             <div className="absolute right-0 top-10 bg-[#111] border border-[#333] rounded w-48 z-50">
//               <button
//                 onClick={handleReset}
//                 className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-[#222]"
//               >
//                 <RotateCcw size={16} /> Reset Code
//               </button>

//               <button
//                 onClick={handleDownload}
//                 className="flex items-center gap-2 px-3 py-2 w-full text-white hover:bg-[#222]"
//               >
//                 <Download size={16} /> Download Code
//               </button>

//               {/* Show delete only for owner */}
//               {fetchedCode?.code?.ownerId === currentUserId && (
//                 <button
//                   onClick={handleDelete}
//                   disabled={isDeleting}
//                   className="flex items-center gap-2 px-3 py-2 w-full text-red-500 hover:bg-[#222]"
//                 >
//                   🗑 Delete Code
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <Editor
//         height="100%"
//         theme="vs-dark"
//         language={selectedLang.monaco}
//         value={code}
//         onChange={(value) => setCode(value || "")}
//         options={{
//           fontSize: 14,
//           minimap: { enabled: false },
//           automaticLayout: true,
//         }}
//       />

//       <Dialog open={openSaveDialog} onOpenChange={setOpenSaveDialog}>
//         <DialogContent className="bg-[#111] border border-[#333]">
//           <DialogHeader>
//             <DialogTitle className="text-center text-white">
//               {isEditMode ? "Update Code" : "Save Your Code"}
//             </DialogTitle>
//             <DialogDescription className="text-center text-sm text-muted-foreground">
//               Give your code a title
//             </DialogDescription>
//           </DialogHeader>

//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 rounded bg-black text-white border border-[#333]"
//           />

//           <button
//             onClick={handleSave}
//             disabled={isSaving || isUpdating}
//             className="mt-3 bg-green-600 py-2 rounded text-white hover:bg-green-700"
//           >
//             {isEditMode
//               ? isUpdating
//                 ? "Updating..."
//                 : "Update Code"
//               : isSaving
//               ? "Saving..."
//               : "Save Code"}
//           </button>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openShareDialog} onOpenChange={setOpenShareDialog}>
//         <DialogContent className="bg-[#111] border border-[#333]">
//           <DialogHeader>
//             <DialogTitle className="text-center text-white">
//               Share Your Code
//             </DialogTitle>
//             <DialogDescription className="text-center text-sm text-muted-foreground">
//               Anyone with this link can view your code
//             </DialogDescription>
//           </DialogHeader>

//           <div className="flex gap-2 mt-3">
//             <input
//               disabled
//               value={shareUrl}
//               className="w-full p-2 rounded bg-black text-green-400"
//             />
//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(shareUrl);
//                 toast.success("Link copied!");
//               }}
//               className="bg-blue-600 cursor-pointer px-3 rounded text-white hover:bg-blue-700"
//             >
//               <Copy size={16} />
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CodeRunnerEditor;

/* eslint-disable no-unused-vars */
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // For getting current user
import { CODE_RUNNER_LANGUAGES } from "@/utils/codeRunnerLanguages";
import { CODE_TEMPLATES } from "@/utils/codeTemplates";
import {
  Settings,
  RotateCcw,
  Download,
  Share2,
  Copy,
  Save,
  PencilLine,
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
  useUpdateLanguageCodeMutation,
  useDeleteLanguageCodeMutation,
} from "@/redux/features/codeRunner/languageCodeApi";
import { toast } from "react-toastify";

const CodeRunnerEditor = ({ onRun, input = "" }) => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const codeId = urlParams.get("code");
  const isEditMode = !!codeId;

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(CODE_TEMPLATES["python"]);
  const [title, setTitle] = useState("My Code Runner Snippet");

  const [openMenu, setOpenMenu] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const selectedLang = CODE_RUNNER_LANGUAGES.find((l) => l.id === language);

  const { data: fetchedCode } = useGetLanguageCodeQuery(codeId, {
    skip: !codeId,
  });

  const [saveLanguageCode, { isLoading: isSaving }] =
    useSaveLanguageCodeMutation();
  const [updateLanguageCode, { isLoading: isUpdating }] =
    useUpdateLanguageCodeMutation();
  const [deleteLanguageCode, { isLoading: isDeleting }] =
    useDeleteLanguageCodeMutation();

  // Get the current logged-in user ID from Redux (replace with your auth logic)
  const currentUserId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (fetchedCode?.success && fetchedCode?.code) {
      setLanguage(fetchedCode.code.language);
      setCode(fetchedCode.code.sourceCode);
      setTitle(fetchedCode.code.title);
    }
  }, [fetchedCode]);

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
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      if (isEditMode) {
        await updateLanguageCode({
          id: codeId,
          title,
          language,
          sourceCode: code,
          input,
        }).unwrap();

        toast.success("Code updated successfully!");
      } else {
        const res = await saveLanguageCode({
          title,
          language,
          sourceCode: code,
          input,
          isPublic: true,
        }).unwrap();

        toast.success("Code saved successfully!");
        navigate(`/editor?code=${res.id}`, { replace: true });
      }

      setOpenSaveDialog(false);
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const handleDelete = async () => {
    if (String(fetchedCode?.code?.ownerId) !== String(currentUserId)) {
      toast.error("Only the owner can delete this code!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this code?")) return;

    try {
      await deleteLanguageCode(codeId).unwrap();
      toast.success("Code deleted successfully!");
      navigate("/"); // Redirect to home or editor list
    } catch (err) {
      toast.error("Failed to delete code");
    }
  };

  const shareUrl = `${window.location.origin}/editor?code=${codeId}`;

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
            onClick={() => setOpenSaveDialog(true)}
            className="p-2 cursor-pointer rounded bg-green-600 text-white hover:bg-green-700"
          >
            {isEditMode ? <PencilLine size={18} /> : <Save size={18} />}
          </button>

          {isEditMode && (
            <button
              onClick={() => setOpenShareDialog(true)}
              className="p-2 rounded cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            >
              <Share2 size={18} />
            </button>
          )}

          <button
            onClick={() => setOpenMenu((p) => !p)}
            className="p-2 rounded cursor-pointer bg-blue-400 hover:bg-blue-300"
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

              {/* Delete button only for owner */}
              {String(fetchedCode?.code?.ownerId) === String(currentUserId) && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-2 w-full text-red-500 hover:bg-[#222]"
                >
                  🗑 Delete Code
                </button>
              )}
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

      <Dialog open={openSaveDialog} onOpenChange={setOpenSaveDialog}>
        <DialogContent className="bg-[#111] border border-[#333]">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              {isEditMode ? "Update Code" : "Save Your Code"}
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Give your code a title
            </DialogDescription>
          </DialogHeader>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-black text-white border border-[#333]"
          />

          <button
            onClick={handleSave}
            disabled={isSaving || isUpdating}
            className="mt-3 bg-green-600 py-2 rounded text-white hover:bg-green-700"
          >
            {isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update Code"
              : isSaving
              ? "Saving..."
              : "Save Code"}
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={openShareDialog} onOpenChange={setOpenShareDialog}>
        <DialogContent className="bg-[#111] border border-[#333]">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Share Your Code
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Anyone with this link can view your code
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mt-3">
            <input
              disabled
              value={shareUrl}
              className="w-full p-2 rounded bg-black text-green-400"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied!");
              }}
              className="bg-blue-600 cursor-pointer px-3 rounded text-white hover:bg-blue-700"
            >
              <Copy size={16} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeRunnerEditor;
