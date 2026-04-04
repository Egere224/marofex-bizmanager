import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { BusinessContext } from "../../context/BusinessContext";
import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"

function Navbar({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const { business } = useContext(BusinessContext);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">

      {/* LEFT SIDE */}
      <div className="flex items-center  gap-2 sm:gap-3 md:gap-6">

        <button
  onClick={toggleSidebar}
  className="md:hidden text-xl"
>
  <FiMenu />
</button>

        <h1 className="text-sm sm:text-base md:text-lg font-semibold truncate text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <Link
          to="/"
          className="text-sm sm:text-base md:text-lg font-semibold truncate text-gray-600 hover:text-indigo-500 transition dark:text-shadow-white"
        >
          Home
        </Link>

        <Link
          to="/businesses"
          className="text-sm sm:text-base md:text-lg font-semibold truncate text-gray-600 hover:text-indigo-500 transition dark:text-shadow-white"
        >
          Switch Business
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 relative">

        <ThemeToggle />

        {/* 🔥 ACCOUNT DROPDOWN */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="text-sm md:text-lg font-semibold text-gray-600 dark:text-gray-300"
          >
           <FaUserCircle className="text-xl md:text-2xl" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">

              {/* BUSINESS INFO */}
              <p className="font-semibold text-gray-900 dark:text-white">
                {business?.name || "No Business Selected"}
              </p>

              <p className="text-sm text-gray-500">
                {business?.category || "Category"}
              </p>

              {/* SUBSCRIPTION STATUS */}
              <div className="mt-3">
                <p className="text-sm font-semibold">Subscription:</p>

                <span
                  className={`text-xs font-bold ${
                    business?.subscription_status === "approved"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {business?.subscription_status || "Not Subscribed"}
                </span>
              </div>

              {/* ACTION */}
              <Link
                to="/subscription"
                className="block mt-4 bg-indigo-500 text-white text-center py-2 rounded-lg hover:bg-indigo-600"
              >
                Manage Subscription
              </Link>

              {/* OPTIONAL LOGOUT */}
              <button
              onClick={logout}
               className="mt-3 w-full text-red-500 text-sm hover:underline">
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;