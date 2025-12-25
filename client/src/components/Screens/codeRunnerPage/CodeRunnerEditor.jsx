import Editor from "@monaco-editor/react";
import { useState } from "react";
import { CODE_RUNNER_LANGUAGES } from "@/utils/codeRunnerLanguages";
import { CODE_TEMPLATES } from "@/utils/codeTemplates";

const CodeRunnerEditor = ({ onRun }) => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(CODE_TEMPLATES["python"]);

  const selectedLang = CODE_RUNNER_LANGUAGES.find((l) => l.id === language);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(CODE_TEMPLATES[lang] || "");
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#222]">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-[#111] cursor-pointer text-white px-3 py-1 rounded"
        >
          {CODE_RUNNER_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onRun(code, language)}
          className="bg-green-600 px-4 py-1 cursor-pointer rounded text-white hover:bg-green-700"
        >
          Run
        </button>
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
    </div>
  );
};

export default CodeRunnerEditor;
