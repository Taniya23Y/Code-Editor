const axios = require("axios");

const languageMap = {
  c: { id: "c", file: "main.c" },
  cpp: { id: "cpp", file: "main.cpp" },
  python: { id: "python3", file: "main.py" },
  java: { id: "java", file: "Main.java" },
  go: { id: "go", file: "main.go" },
  rust: { id: "rust", file: "main.rs" },
  ruby: { id: "ruby", file: "main.rb" },
  csharp: { id: "csharp", file: "Program.cs" },
  swift: { id: "swift", file: "main.swift" },
  typescript: { id: "typescript", file: "main.ts" },
};

const runProgram = async (req, res) => {
  try {
    const { sourceCode, language, input } = req.body;

    if (!sourceCode || !language)
      return res
        .status(400)
        .json({ message: "sourceCode and language are required" });

    const langInfo = languageMap[language];
    if (!langInfo)
      return res.status(400).json({ message: "Language not supported" });

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: langInfo.id,
        version: "*",
        files: [{ name: langInfo.file, content: sourceCode }],
        stdin: input || "",
      },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    );

    const stdout = response.data?.run?.stdout || "";
    const stderr = response.data?.run?.stderr || "";

    return res.status(200).json({ stdout, stderr });
  } catch (err) {
    console.error("Server Execution Error:", err.response?.data || err.message);
    return res.status(500).json({
      message: "Execution failed",
      error: err.response?.data || err.message,
    });
  }
};

module.exports = { runProgram };
