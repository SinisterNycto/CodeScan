import React from "react";
import { BrainCog, Sun, Moon } from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div
      className={`
    nav flex items-center justify-between h-[90px] transition-colors duration-150
    ${
      theme === "dark"
        ? "bg-zinc-800 text-white"
        : "bg-white text-black shadow-sm border-b border-gray-200"
    }
  `}
      style={{ padding: "0px 150px" }}
    >
      {/* Logo */}
      <div className="logo flex items-center gap-[10px]">
        <BrainCog size={50} color="#4f46e5" />
        <span className="text-2xl font-bold ml-2">CodeScan</span>
      </div>

      {/* Theme Toggle Button */}
      <div className="icons flex items-center gap-[15px]">
        <button
          onClick={toggleTheme}
          className={`cursor-pointer p-2 rounded-full transition-all
            ${theme === "dark" ? "hover:text-[#4f46e5]" : "hover:bg-gray-100"}
          `}
        >
          {theme === "dark" ? <Sun size={26} /> : <Moon size={26} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
