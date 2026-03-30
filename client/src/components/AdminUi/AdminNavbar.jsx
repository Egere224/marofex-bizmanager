import { useTheme } from "../context/theme";
import ThemeToggle from "../ThemeToggle";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  const { darkMode } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        background: darkMode ? "#1e293b" : "#ffffff",
        borderBottom: darkMode ? "1px solid #334155" : "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* LEFT */}
      <h3 style={{ color: darkMode ? "#f1f5f9" : "#111" }}>
        Admin Dashboard
      </h3>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <ThemeToggle />

        {/* USER INFO */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaUserCircle size={18} />

          <span style={{ color: darkMode ? "#e2e8f0" : "#333" }}>
            {user?.full_name || "Admin"}
          </span>

          {/* ROLE BADGE */}
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "10px",
              background: "#22c55e",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {user?.role || "admin"}
          </span>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: darkMode ? "#ef4444" : "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;