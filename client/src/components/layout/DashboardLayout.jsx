import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">

        {/* Top navbar */}
        <Navbar />

        {/* Page content */}
        <main className="p-4 sm:p-6 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 ">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;