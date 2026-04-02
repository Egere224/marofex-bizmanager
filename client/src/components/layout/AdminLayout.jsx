import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminUi/AdminSidebar";
import AdminNavbar from "../AdminUi/AdminNavbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          marginLeft: "250px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        
        {/* NAVBAR (FIXED TOP) */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <AdminNavbar />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;