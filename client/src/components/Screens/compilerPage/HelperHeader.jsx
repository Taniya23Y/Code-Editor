import React, { useEffect, useRef, useState } from "react";
import { Code, Copy, Download, PencilLine, Save, Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Input from "../../ui/input";
import { updateCurrentLanguage } from "@/redux/features/compiler/compilerSlice";
import {
  useEditCodeMutation,
  useSaveCodeMutation,
} from "@/redux/features/compiler/codeSlice";

const HelperHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { urlId } = useParams();

  const {
    fullCode,
    currentLanguage,
    isOwner,
    title: titleFromRedux,
  } = useSelector((state) => state.compiler);
  const isLoggedIn = useSelector((state) => !!state.auth?.user);

  const [shareBtn, setShareBtn] = useState(!!urlId);
  const [open, setOpen] = useState(false);

  // Ref to track if user typed
  const hasTypedRef = useRef(false);

  // Initialize from Redux / fallback
  const [postTitle, setPostTitle] = useState(titleFromRedux || "My Code");

  // Update postTitle if Redux value changes but user hasn't typed
  useEffect(() => {
    if (!hasTypedRef.current && titleFromRedux) {
      setPostTitle(titleFromRedux);
    }
  }, [titleFromRedux]);

  const handleChange = (e) => {
    hasTypedRef.current = true; // mark that user typed
    setPostTitle(e.target.value);
  };

  useEffect(() => {
    setShareBtn(!!urlId);
  }, [urlId]);

  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [editCode, { isLoading: editLoading }] = useEditCodeMutation();

  /* ---------------- DOWNLOAD ---------------- */
  const handleDownloadCode = () => {
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
      return toast.error("Error: Code is Empty");
    }

    const files = [
      { content: fullCode.html, name: "index.html", type: "text/html" },
      { content: fullCode.css, name: "style.css", type: "text/css" },
      {
        content: fullCode.javascript,
        name: "script.js",
        type: "text/javascript",
      },
    ];

    files.forEach((file) => {
      if (!file.content) return;
      const blob = new Blob([file.content], { type: file.type });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
    });

    toast.success("Code Downloaded Successfully!");
  };

  /* ---------------- SAVE ---------------- */
  const handleSaveCode = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to save code");
      navigate("/login");
      return;
    }

    try {
      const res = await saveCode({
        fullCode,
        title: postTitle,
        description: "",
        isPublic: false,
      }).unwrap();

      toast.success("Code Saved Successfully");
      setOpen(false);

      navigate(`/live-preview/${res.data._id}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditCode = async () => {
    if (!isOwner) {
      toast.error("Only owner can edit this code");
      return;
    }

    try {
      await editCode({ fullCode, id: urlId, title: postTitle }).unwrap();
      toast.success("Code Updated Successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="h-12.5 bg-black text-white p-2 flex justify-between items-center">
      <div className="flex gap-1">
        {/* SAVE */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="success"
              disabled={!isLoggedIn}
              onClick={() => setOpen(true)}
            >
              <Save size={16} />
            </Button>
          </DialogTrigger>

          {isLoggedIn && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code /> Save your Code!
                </DialogTitle>
                <DialogDescription className="text-center text-sm text-muted-foreground">
                  Give your code a title and save it to your profile
                </DialogDescription>
                <div className="flex gap-2 mt-2">
                  <Input
                    className="bg-slate-700 text-white focus-visible:ring-0"
                    placeholder="Post title"
                    value={postTitle}
                    onChange={handleChange}
                  />
                  <Button
                    variant="success"
                    onClick={handleSaveCode}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>

        {/* DOWNLOAD */}
        <Button size="icon" variant="blue" onClick={handleDownloadCode}>
          <Download size={16} />
        </Button>

        {/* SHARE + EDIT */}
        {shareBtn && (
          <>
            {isOwner && (
              <Button
                variant="blue"
                loading={editLoading}
                onClick={handleEditCode}
              >
                <PencilLine size={16} /> Edit
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Share2 size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 justify-center items-center">
                    <Code /> Share your Code!
                  </DialogTitle>
                  <DialogDescription className="text-center text-sm text-muted-foreground">
                    Give your code a title and save it to your profile
                  </DialogDescription>
                  <div className="flex gap-1">
                    <input
                      disabled
                      value={window.location.href}
                      className="w-full p-2 rounded bg-slate-800 text-white"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("URL Copied!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* LANGUAGE SELECT */}
      <div className="flex items-center gap-2">
        <small>Current Language:</small>
        <Select
          value={currentLanguage}
          onValueChange={(value) => dispatch(updateCurrentLanguage(value))}
        >
          <SelectTrigger className="w-30 bg-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
