import CodeRunnerEditor from "@/components/Screens/codeRunnerPage/CodeRunnerEditor";
import SplitPane from "@/components/ui/custom/SplitPane";
import { useRunCodeMutation } from "@/redux/features/codeRunner/codeRunnerApi";
import { useGetLanguageCodeQuery } from "@/redux/features/codeRunner/languageCodeApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Editor = () => {
  const { code: codeId } = useParams();
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const [runCode, { isLoading }] = useRunCodeMutation();
  const { data: fetchedCode, isLoading: loadingCode } = useGetLanguageCodeQuery(
    codeId,
    { skip: !codeId }
  );

  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = currentUser?._id?.toString() || null;

  const handleRun = async (code, language) => {
    try {
      const res = await runCode({ sourceCode: code, language, input }).unwrap();
      setOutput(res.stdout || res.stderr || "No output");
    } catch (err) {
      setOutput(err?.data?.message || "Execution failed");
    }
  };

  if (loadingCode)
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Loading code...
      </div>
    );

  return (
    <div className="bg-black container mx-auto pt-15 scrollbar-hide">
      <SplitPane
        left={
          <CodeRunnerEditor
            onRun={handleRun}
            initialCode={fetchedCode?.code?.sourceCode || ""}
            initialLanguage={fetchedCode?.code?.language || "python"}
            isShared={!!codeId}
            ownerId={fetchedCode?.code?.owner || null}
            currentUserId={currentUserId}
            codeId={codeId}
          />
        }
        right={
          <div className="bg-black text-white p-4 h-full overflow-auto">
            <h3 className="mb-2">Input</h3>
            <textarea
              className="w-full bg-[#111] p-2 mb-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <h3 className="mb-2">Output</h3>
            <pre className="bg-[#111] p-3 min-h-50 select-text pointer-events-auto">
              {isLoading ? "Running..." : output}
            </pre>
          </div>
        }
      />
    </div>
  );
};

export default Editor;
