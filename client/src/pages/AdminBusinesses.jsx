import { useEffect, useState } from "react";
import { getBusinesses } from "../services/adminService";
import { useTheme } from "../context/themeContext";

const AdminBusinesses = () => {
  const { darkMode } = useTheme();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await getBusinesses();
      setBusinesses(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch businesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
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
        
        <h2 style={{ marginBottom: "20px" }}>🏢 Admin Businesses</h2>

        {loading && <p>Loading businesses...</p>}
        {!loading && businesses.length === 0 && <p>No businesses found</p>}

        <div style={{ display: "grid", gap: "15px" }}>
          {businesses.map((b) => (
            <div
              key={b.id}
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <p><b>{b.name}</b></p>
              <p>Owner: {b.owner_name}</p>
              <p>Email: {b.owner_email}</p>
              <p style={{ opacity: 0.6 }}>
                Created: {new Date(b.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBusinesses;