import { useTheme } from "../context/themeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-5 py-2 rounded-full
bg-linear-to-r from-indigo-500 to-purple-600
text-white shadow-lg hover:scale-105 transition duration-300"
    >
      {darkMode ? <FaMoon /> : <FaSun />}
      {darkMode ? "Dark" : "Light"}
    </button>
  );
}