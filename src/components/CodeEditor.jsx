import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode, theme = "vs-dark" }) => {
  // Monaco expects a language string; fall back to plaintext
  const monacoLang = language || "plaintext";

  return (
    <Editor
      height="100%"
      theme={theme}
      language={monacoLang}
      value={code}
      onChange={(value) => setCode(value ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 15,
        lineHeight: 24,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        renderWhitespace: "none",
      }}
    />
  );
};

export default CodeEditor;
