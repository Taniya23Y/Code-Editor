import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { useDispatch, useSelector } from "react-redux";
import { updateCodeValue } from "@/redux/features/compiler/compilerSlice";

export default function CodeEditor() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.compiler.currentLanguage
  );
  const fullCode = useSelector((state) => state.compiler.fullCode);

  const onChange = React.useCallback(
    (value) => {
      dispatch(updateCodeValue({ language: currentLanguage, value }));
    },
    [dispatch, currentLanguage]
  );

  const getLanguageExtension = () => {
    switch (currentLanguage) {
      case "javascript":
        return javascript();
      case "html":
        return html();
      case "css":
        return css();
      default:
        return null;
    }
  };

  const extensions = getLanguageExtension() ? [getLanguageExtension()] : [];

  return (
    <CodeMirror
      key={currentLanguage}
      value={fullCode?.[currentLanguage] ?? ""}
      height="calc(100vh - 50px)"
      extensions={extensions}
      onChange={onChange}
      theme={draculaInit({
        settings: { caret: "#c6c6c6", fontFamily: "monospace" },
      })}
    />
  );
}
