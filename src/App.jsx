import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import LanguageSelect from "./components/LanguageSelect";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { CircleLoader } from "react-spinners";

// Monaco Workers

import "monaco-editor/esm/vs/editor/editor.worker.js?worker";
import "monaco-editor/esm/vs/language/json/json.worker.js?worker";
import "monaco-editor/esm/vs/language/css/css.worker.js?worker";
import "monaco-editor/esm/vs/language/html/html.worker.js?worker";
import "monaco-editor/esm/vs/language/typescript/ts.worker.js?worker";

const App = () => {
  const [language, setLanguage] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [theme, setTheme] = useState("dark");

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // Review Code Function

  async function reviewCode() {
    if (!language) return alert("Please select a language first!");

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          prompt: `
You are an expert-level ${language} developer.

Review the following code and provide:
1. Quality rating (Better / Good / Normal / Bad)
2. Detailed explanation
3. Best practices & improvements
4. Potential bugs
5. Syntax/runtime errors
6. Corrected version if needed.

\`\`\`${language}
${code}
\`\`\`
        `,
        }),
      });

      const data = await res.json();

      // The server returns raw Gemini response; choose how to display it:
      setResponse(data.text || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Review Error:", err);
      setResponse("❌ Error while reviewing code.");
    }

    setLoading(false);
  }

  // Fix Code function

  async function fixCode() {
    if (!language) return alert("Please select a language first!");

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          prompt: `
You are an expert ${language} developer.

Fix this code by:
- Correcting errors
- Improving structure
- Keeping same logic unless incorrect
- Returning ONLY the fixed code inside a code block.

\`\`\`${language}
${code}
\`\`\`
        `,
        }),
      });

      const data = await res.json();

      // The API returns text() from Gemini
      setResponse(data.text || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Fix Error:", err);
      setResponse("❌ Error while fixing code.");
    }

    setLoading(false);
  }

  // return UI

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div
        className={`main flex justify-between ${theme}`}
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* Left Panel */}
        <div
          className={`left w-[50%] p-6 flex flex-col gap-4 h-full 
  ${
    theme === "dark"
      ? "bg-zinc-900"
      : "bg-white text-black shadow-md border border-gray-200"
  }`}
        >
          {/* Language & Buttons */}
          <div className="flex items-center gap-4 w-full mb-2 mt-4">
            <LanguageSelect
              language={language}
              setLanguage={setLanguage}
              theme={theme}
            />

            <button
              className={`px-6 py-3 rounded-xl transition font-medium
  ${
    theme === "dark"
      ? "bg-zinc-800 text-white hover:bg-zinc-700"
      : "bg-gray-200 text-black hover:bg-gray-300 shadow-sm border border-gray-300"
  }`}
              onClick={() => {
                if (!code.trim()) return alert("Please enter your code");
                fixCode();
              }}
            >
              Fix Code
            </button>

            <button
              className={`px-6 py-3 rounded-xl transition
  ${
    theme === "dark"
      ? "bg-zinc-800 text-white hover:bg-zinc-700"
      : "bg-gray-200 text-black hover:bg-gray-300"
  }`}
              onClick={() => {
                if (!code.trim()) return alert("Please enter your code");
                reviewCode();
              }}
            >
              Review
            </button>
          </div>

          {/* Code Editor */}
          <div className="flex-1 rounded-lg overflow-hidden border border-zinc-700">
            <CodeEditor
              language={language}
              code={code}
              setCode={setCode}
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div
          className={`right overflow-scroll w-[50%] p-4 
  ${
    theme === "dark"
      ? "bg-black text-white"
      : "bg-[#fafafa] text-black border-l border-gray-200"
  }`}
        >
          <div
            className={`topTab border-b border-t flex items-center justify-between h-[60px] 
  ${
    theme === "dark"
      ? "text-white border-[#27272a]"
      : "text-black border-gray-300"
  }
`}
          >
            <p className="font-bold text-lg">Response</p>
          </div>

          {loading && (
            <div className="loader-wrapper">
              <CircleLoader color="#4f46e5" size={100} />
            </div>
          )}

          <div className={`markdown-body ${theme}`}>
            <Markdown>{response}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
