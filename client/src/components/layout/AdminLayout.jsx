import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminUi/AdminSidebar";
import AdminNavbar from "../AdminUi/AdminNavbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div style={{ padding: "20px" }}>
          <Outlet /> {/* 🔥 THIS IS THE FIX */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;