import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import WhatsAppButton from "../Temp";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png"
import { FaSignInAlt, FaUserPlus, FaBlog } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useLocation } from "react-router-dom";

function MarketingLayout() {

  const { token, logout } = useContext(AuthContext);

  const location = useLocation();

  const isBusinessSelection = location.pathname === "/businesses";
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617]">

      {/* NAVBAR */}

      <header className="
sticky top-6 z-50
max-w-7xl mx-auto
px-8 py-4
rounded-full
shadow-xl
backdrop-blur-xl
border border-white/10
shadow-lg
bg-gradient-to-b
from-[#020617]
via-[#1e1b4b]
to-[#020617]

dark:bg-white
dark:bg-none

text-white
dark:text-gray-900
">

<div className="grid grid-cols-3 items-center">

{/* LEFT NAV */}
<div className="flex items-center gap-6">

  {token ? (
    <>
      {isBusinessSelection ? (
      <>
        <Link
          to="/"
          className="text-shadow-gray-50 dark:text-gray-900 hover:text-blue-400"
        >
          ← Back to Website
        </Link>

        <button
          onClick={logout}
          className="text-shadow-gray-50 dark:text-gray-900 hover:text-red-400"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        {/* NORMAL DASHBOARD ENTRY */}
        <Link
          to="/businesses"
          className="text-shadow-gray-50 dark:text-gray-900 hover:text-blue-400"
        >
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="text-shadow-gray-50 dark:text-gray-900 hover:text-red-400"
        >
          Logout
        </button>
      </>
    )}
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="flex items-center gap-2 text-shadow-gray-50 dark:text-gray-900 hover:text-blue-400"
      >
        <FaSignInAlt />
        Login
      </Link>

      <Link
        to="/register"
        className="flex items-center gap-2 text-shadow-gray-50 dark:text-gray-900 hover:text-blue-400"
      >
        <FaUserPlus />
        Register
      </Link>
    </>
  )}

</div>


{/* CENTER LOGO */}
<div className="flex justify-center">

<img
src={logoLight}
alt="BizManager"
className="block hover:scale-105 transition duration-300 dark:hidden h-12 drop-shadow-md"
/>
<img
src={logoDark}
alt="BizManager"
className="hidden dark:block h-12 drop-shadow-md hover:scale-105 transition duration-300"
/>

</div>


{/* RIGHT NAV */}
<div className="flex justify-end items-center gap-6">

<Link to="/blog" className="flex items-center text-shadow-gray-50 dark:text-gray-900 gap-2 hover:text-blue-400">
<FaBlog />
Blog
</Link>

<Link to="/pricing" className="text-shadow-gray-50 dark:text-gray-900 hover:text-blue-400">
Pricing
</Link>

<ThemeToggle />

</div>

</div>

</header>



      {/* PAGE CONTENT */}

      <main className="flex-1">

        <Outlet />

      </main>



      {/* FOOTER */}

      <footer className="bg-gray-900 text-gray-400 py-10 mt-20">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p>
            © {new Date().getFullYear()} BizManager. All rights reserved.
          </p>


          <div className="flex gap-6">

            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>

            <Link to="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link to="/login" className="hover:text-white">
              Login
            </Link>

            <Link to="/register" className="hover:text-white">
              Register
            </Link>

          </div>

        </div>

      </footer>



      {/* WHATSAPP SUPPORT BUTTON */}

      <WhatsAppButton />

    </div>
  );
}

export default MarketingLayout;