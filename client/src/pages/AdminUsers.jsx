import { useEffect, useState, useContext } from "react";
import { getUsers, deleteUser } from "../services/adminService";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/themeContext";

const AdminUsers = () => {
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const theme = {
    background: darkMode ? "#0f172a" : "#f1f5f9",
    card: darkMode ? "#1e293b" : "#ffffff",
    text: darkMode ? "#e2e8f0" : "#0f172a",
    border: darkMode ? "#334155" : "#e2e8f0",
  };

  return (
    <div style={{ background: theme.background, minHeight: "100vh", padding: "30px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <h2 style={{ marginBottom: "20px" }}>👤 Admin Users</h2>

        {loading && <p>Loading users...</p>}
        {!loading && users.length === 0 && <p>No users found</p>}

        <div style={{ display: "grid", gap: "15px" }}>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <p><b>{u.full_name}</b></p>
              <p>{u.email}</p>
              <p>{u.phone}</p>

              {/* ACTION */}
              {user?.id !== u.id && (
                <button
                  onClick={() => handleDelete(u.id)}
                  disabled={deletingId === u.id}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    background: deletingId === u.id ? "#94a3b8" : "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: deletingId === u.id ? "not-allowed" : "pointer",
                  }}
                >
                  {deletingId === u.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;