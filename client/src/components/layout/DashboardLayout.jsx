import { useState } from "react"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white w-[75%] sm:w-64 dark:bg-gray-800 z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          md:translate-x-0 md:static
        `}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>
      {/* 🔥 BACKDROP (CLICK TO CLOSE) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">

        {/* NAVBAR */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* Page content */}
        <main className="p-4 sm:p-6 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 ">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;