import ThemeToggle from "../ThemeToggle";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">

      <div className="flex items-center gap-15">

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        {/* 🔥 NEW: BACK TO WEBSITE */}
        <Link
          to="/"
          className="text-lg font-semibold text-gray-600 hover:text-indigo-500 transition dark:text-shadow-white"
        >
          ← Back to Website
        </Link>

        <Link
          to="/businesses"
          className="text-lg text-gray-600 hover:text-indigo-500 transition dark:text-shadow-white font-semibold"
        >
          Switch Business
        </Link>
      </div>

      <div className="flex items-center gap-4">

        <ThemeToggle />

        <div className="text-sm text-gray-600 dark:text-gray-300">
          Account
        </div>

      </div>

    </header>
  );
}

export default Navbar;