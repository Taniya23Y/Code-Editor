// import CodeEditor from "@/components/Screens/compilerPage/CodeEditor";
// import HelperHeader from "@/components/Screens/compilerPage/HelperHeader";
// import RenderCode from "@/components/Screens/compilerPage/RenderCode";
// import SplitPane from "@/components/ui/custom/SplitPane";

// const LivePreview = () => {
//   return (
//     <div className="bg-[#000000] container mx-auto pt-15 scrollbar-hide">
//       <SplitPane
//         left={
//           <div className="app-container">
//             <HelperHeader />
//             <div className="code-editor-container">
//               <CodeEditor />
//             </div>
//           </div>
//         }
//         right={<RenderCode />}
//       />
//     </div>
//   );
// };

// export default LivePreview;

import CodeEditor from "@/components/Screens/compilerPage/CodeEditor";
import HelperHeader from "@/components/Screens/compilerPage/HelperHeader";
import RenderCode from "@/components/Screens/compilerPage/RenderCode";
import SplitPane from "@/components/ui/custom/SplitPane";
import { useLoadCodeMutation } from "@/redux/features/compiler/codeSlice";
import {
  updateFullCode,
  updateIsOwner,
  updateTitle,
} from "@/redux/features/compiler/compilerSlice";
import { handleError } from "@/utils/handleError";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Compiler = () => {
  const { urlId } = useParams();
  const [loadEXistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadEXistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.code.fullCode));
        dispatch(updateTitle(response.code.title));
        dispatch(updateIsOwner(response.isOwner));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        Loader
      </div>
    );
  }

  return (
    <div className="bg-[#000000] container mx-auto pt-15 scrollbar-hide">
      <SplitPane
        left={
          <div className="app-container">
            <HelperHeader />
            <div className="code-editor-container">
              <CodeEditor />
            </div>
          </div>
        }
        right={<RenderCode />}
      />
    </div>
  );
};

export default Compiler;
