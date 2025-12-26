// import CodeRunnerEditor from "@/components/Screens/codeRunnerPage/CodeRunnerEditor";
// import SplitPane from "@/components/ui/custom/SplitPane";
// import { useRunCodeMutation } from "@/redux/features/codeRunner/codeRunnerApi";
// import { useState } from "react";

// const Editor = () => {
//   const [output, setOutput] = useState("");
//   const [input, setInput] = useState("");
//   const [runCode, { isLoading }] = useRunCodeMutation();

//   const handleRun = async (code, language) => {
//     try {
//       const res = await runCode({ sourceCode: code, language, input }).unwrap();
//       setOutput(res.stdout || res.stderr || "No output");
//     } catch (err) {
//       setOutput(err?.data?.message || "Execution failed");
//     }
//   };

//   return (
//     <div className="bg-[#000000] container mx-auto pt-15 scrollbar-hide">
//       <SplitPane
//         left={<CodeRunnerEditor onRun={handleRun} />}
//         right={
//           <div className="bg-black text-white p-4 h-full overflow-auto">
//             <h3 className="mb-2">Input</h3>
//             <textarea
//               className="w-full bg-[#111] p-2 mb-4"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <h3 className="mb-2">Output</h3>
//             <pre className="bg-[#111] p-3 min-h-50">
//               {isLoading ? "Running..." : output}
//             </pre>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default Editor;

import CodeRunnerEditor from "@/components/Screens/codeRunnerPage/CodeRunnerEditor";
import SplitPane from "@/components/ui/custom/SplitPane";
import { useRunCodeMutation } from "@/redux/features/codeRunner/codeRunnerApi";
import { useGetCodeQuery } from "@/redux/features/codeRunner/shareApi";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Editor = () => {
  const { shareId } = useParams();
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const [runCode, { isLoading }] = useRunCodeMutation();
  const { data: sharedData, isLoading: loadingShared } = useGetCodeQuery(
    shareId,
    {
      skip: !shareId,
    }
  );

  const handleRun = async (code, language) => {
    try {
      const res = await runCode({ sourceCode: code, language, input }).unwrap();
      setOutput(res.stdout || res.stderr || "No output");
    } catch (err) {
      setOutput(err?.data?.message || "Execution failed");
    }
  };

  if (loadingShared) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Loading shared code...
      </div>
    );
  }

  return (
    <div className="bg-[#000000] container mx-auto pt-15 scrollbar-hide">
      <SplitPane
        left={
          <CodeRunnerEditor
            onRun={handleRun}
            initialCode={sharedData?.sourceCode}
            initialLanguage={sharedData?.language}
            isShared={!!shareId}
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
            <pre className="bg-[#111] p-3 min-h-50">
              {isLoading ? "Running..." : output}
            </pre>
          </div>
        }
      />
    </div>
  );
};

export default Editor;
