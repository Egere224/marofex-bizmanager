import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import WhatsAppButton from "../Temp";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png"
import { FaSignInAlt, FaUserPlus, FaBars, FaBlog } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

import { useLocation } from "react-router-dom";

function MarketingLayout() {

  const { token, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const isBusinessSelection = location.pathname === "/businesses";
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#020617]">

      {/* NAVBAR */}

      <header className="
  sticky top-0 z-50 w-full

  /* 📱 MOBILE LIGHT */
  bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500

  /* 📱 MOBILE DARK (NEON PURPLE) */
  dark:bg-gradient-to-r dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]
  dark:shadow-[0_0_25px_rgba(168,85,247,0.6)]

  px-4 py-3

  /* 💻 DESKTOP (UNCHANGED) */
  md:top-6 md:max-w-7xl md:mx-auto
  md:px-8 md:py-4
  md:rounded-full
  md:shadow-xl
  md:border md:border-white/10
  md:backdrop-blur-xl
  md:bg-gradient-to-b
  md:from-[#020617]
  md:via-[#1e1b4b]
  md:to-[#020617]

  text-white md:dark:text-gray-900
">
<div className="flex items-center justify-between">

{/* LEFT NAV */}
<div className="hidden md:flex items-center gap-6 text-base">

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
<div className="flex justify-center md:justify-center flex-1">

<img
src={logoLight}
alt="BizManager"
className="block hover:scale-105 transition duration-300 dark:hidden h-10 md:h-12 drop-shadow-md"
/>
<img
src={logoDark}
alt="BizManager"
className="hidden dark:block h-10 md:h-12 drop-shadow-md hover:scale-105 transition duration-300"
/>

</div>

<div className="md:hidden">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-white text-2xl"
  >
    <FaBars />
  </button>
</div>


{/* RIGHT NAV */}
<div className="hidden md:flex items-center gap-6 text-base">

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

{menuOpen && (
  <div className="
    md:hidden
    absolute top-16 left-0 w-full
    bg-[#020617]
    px-6 py-6
    space-y-4
    z-40
  ">

    {/* AUTH LINKS */}
    {token ? (
      <>
        {isBusinessSelection ? (
          <Link to="/" onClick={() => setMenuOpen(false)}>
            ← Back to Website
          </Link>
        ) : (
          <Link to="/businesses" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
      </>
    )}

    {/* GENERAL LINKS */}
    <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
    <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>

    {/* THEME */}
    <div className="pt-4 border-t border-white/10">
      <ThemeToggle />
    </div>

  </div>
)}



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