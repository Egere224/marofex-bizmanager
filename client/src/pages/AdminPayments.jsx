import { useEffect, useState, useContext } from "react";
import { useTheme } from "../context/themeContext";
import ThemeToggle from "../components/ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import { getPayments, approvePayment } from "../services/adminService";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const AdminPayments = () => {
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState(null); // ✅ NEW

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setApprovingId(id); // ✅ track button loading

      await approvePayment(id);

      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const theme = {
    background: darkMode ? "#0f172a" : "#f1f5f9",
    card: darkMode ? "#1e293b" : "#ffffff",
    text: darkMode ? "#e2e8f0" : "#0f172a",
    border: darkMode ? "#334155" : "#e2e8f0",
  };

  return (
    <div
      style={{
        background: theme.background,
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* CONTAINER */}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            💳 Admin Payments
          </h2>
          <p style={{ opacity: 0.7 }}>Manage and approve payments</p>
        </div>

        {/* LOADING */}
        {loading && <p>Loading payments...</p>}

        {/* EMPTY */}
        {!loading && payments.length === 0 && <p>No payments found</p>}

        {/* LIST */}
        <div style={{ display: "grid", gap: "20px" }}>
          {payments.map((p) => (
            <div
              key={p.id}
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "20px",
                borderRadius: "12px",
                boxShadow: darkMode
                  ? "0 4px 20px rgba(0,0,0,0.4)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {/* TOP ROW */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h4 style={{ margin: 0 }}>{p.full_name}</h4>
                  <small style={{ opacity: 0.6 }}>{p.email}</small>
                </div>

                {/* STATUS BADGE */}
                <div>
                  {p.status === "approved" ? (
                    <span style={{ color: "limegreen", fontWeight: "bold" }}>
                      ✔ Approved
                    </span>
                  ) : (
                    <span style={{ color: "orange", fontWeight: "bold" }}>
                      ⏳ Pending
                    </span>
                  )}
                </div>
              </div>

              {/* DETAILS */}
              <div style={{ marginBottom: "12px" }}>
                <p><b>Business:</b> {p.business_name}</p>
                <p><b>Amount:</b> ₦{p.amount}</p>
              </div>

              {/* RECEIPT */}
              {p.proof_url && (
                <img
                  src={p.proof_url}
                  alt="receipt"
                  style={{
                    width: "140px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: `1px solid ${theme.border}`,
                    marginBottom: "12px",
                  }}
                  onClick={() => window.open(p.proof_url, "_blank")}
                />
              )}

              {/* ACTION */}
              {user?.role === "admin" && p.status === "pending" && (
                <button
                  onClick={() => handleApprove(p.id)}
                  disabled={approvingId === p.id}
                  style={{
                    padding: "10px 16px",
                    background:
                      approvingId === p.id
                        ? "#94a3b8"
                        : darkMode
                        ? "#22c55e"
                        : "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      approvingId === p.id ? "not-allowed" : "pointer",
                  }}
                >
                  {approvingId === p.id
                    ? "Approving..."
                    : "Approve Payment"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;