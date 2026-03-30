import { NavLink } from "react-router-dom";
import { useTheme } from "../context/theme";
import { FaMoneyBillWave, FaUsers, FaBuilding } from "react-icons/fa";

const AdminSidebar = () => {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: darkMode ? "#020617" : "#0f172a",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP */}
      <div>
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <NavItem
            to="/admin/payments"
            label="Payments"
            icon={<FaMoneyBillWave />}
          />
          <NavItem
            to="/admin/users"
            label="Users"
            icon={<FaUsers />}
          />
          <NavItem
            to="/admin/businesses"
            label="Businesses"
            icon={<FaBuilding />}
          />
        </nav>
      </div>

      {/* BOTTOM */}
      <div style={{ fontSize: "12px", opacity: 0.7 }}>
        © Admin Dashboard
      </div>
    </div>
  );
};

const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 12px",
      borderRadius: "8px",
      textDecoration: "none",
      color: "white",
      background: isActive ? "#1e293b" : "transparent",
      transition: "0.2s",
    })}
  >
    <span style={{ fontSize: "16px" }}>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default AdminSidebar;