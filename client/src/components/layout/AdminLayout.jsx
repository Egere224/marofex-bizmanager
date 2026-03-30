import AdminSidebar from "../AdminUi/AdminSidebar";
import AdminNavbar from "../AdminUi/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;