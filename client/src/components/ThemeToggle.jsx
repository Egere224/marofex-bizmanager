import { useTheme } from "../context/themeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1 sm:gap-2
    px-2 py-1 sm:px-3 sm:py-1.5
    text-xs sm:text-sm md:text-base rounded-full
bg-linear-to-r from-indigo-500 to-purple-600
text-white shadow-lg hover:scale-105 transition duration-300"
    >
      {darkMode ? <FaMoon /> : <FaSun />}
      {darkMode ? "Dark" : "Light"}
    </button>
  );
}