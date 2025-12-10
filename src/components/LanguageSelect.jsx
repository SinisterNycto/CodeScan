import React from "react";
import Select from "react-select";

const languageOptions = [
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
];

const LanguageSelect = ({ language, setLanguage, theme = "dark" }) => {
  const isDark = theme === "dark";

  const styles = {
    control: (base) => ({
      ...base,
      width: "500px",
      minWidth: "260px",
      marginRight: "8px",
      backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
      borderColor: isDark ? "#4f46e5" : "#e5e7eb",
      padding: "6px",
      minHeight: "44px",
      boxShadow: "none",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#fff" : "#0f172a",
      fontWeight: 500,
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? "#9ca3af" : "#6b7280",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1f1f1f" : "#fff",
      color: isDark ? "#fff" : "#0f172a",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? "#27272a"
          : "#f3f4f6"
        : "transparent",
      color: isDark ? "#fff" : "#0f172a",
      cursor: "pointer",
    }),
    input: (base) => ({ ...base, color: isDark ? "#fff" : "#0f172a" }),
  };

  return (
    <Select
      value={
        language ? languageOptions.find((opt) => opt.value === language) : null
      }
      onChange={(opt) => setLanguage(opt?.value || null)}
      options={languageOptions}
      placeholder="Select a Language..."
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      styles={styles}
      isSearchable={false}
    />
  );
};

export default LanguageSelect;
