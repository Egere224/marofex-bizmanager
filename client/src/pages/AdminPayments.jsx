import { useEffect, useState, useContext } from "react";
import { useTheme } from "../context/themeContext";
import ThemeToggle from "../components/ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import { getPayments, approvePayment } from "../services/adminService";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const AdminPayments = () => {
      console.log("admin payment")
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH PAYMENTS
  const fetchPayments = async () => {
     console.log("fetch payment")
    try {
      setLoading(true);
      const data = await getPayments();
      console.log("response data:", data)
      setPayments(data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  // APPROVE PAYMENT
  const handleApprove = async (id) => {
    try {
      await approvePayment(id);
      alert("Payment Approved ✅");
      fetchPayments(); // refresh
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  useEffect(() => {
     console.log("useEffect payment")
    fetchPayments();
  }, []);

  // 🎨 THEME
  const theme = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    card: darkMode ? "#1e293b" : "#ffffff",
    text: darkMode ? "#e2e8f0" : "#0f172a",
    border: darkMode ? "#334155" : "#e2e8f0",
  };

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "0.3s",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>💳 Admin Payments</h2>
        <ThemeToggle />
      </div>

      {/* LOADING */}
      {loading && <p>Loading payments...</p>}

      {/* EMPTY */}
      {!loading && payments.length === 0 && <p>No payments found</p>}

      {/* LIST */}
      <div style={{ display: "grid", gap: "15px" }}>
        {payments.map((p) => (
          <div
            key={p.id}
            style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              padding: "15px",
              borderRadius: "10px",
              boxShadow: darkMode
                ? "0 0 10px rgba(0,0,0,0.5)"
                : "0 0 10px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* LEFT */}
            <div>
              <p><b>User:</b> {p.full_name}</p>
              <p><b>Email:</b> {p.email}</p>
              <p><b>Business:</b> {p.business_name}</p>
              <p><b>Amount:</b> ₦{p.amount}</p>

              {/* STATUS */}
              <p
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <b>Status:</b>

                {p.status === "approved" ? (
                  <>
                    <FaCheckCircle color="limegreen" />
                    <span style={{ color: "limegreen", fontWeight: "bold" }}>
                      Approved
                    </span>
                  </>
                ) : (
                  <>
                    <FaClock color="orange" />
                    <span style={{ color: "orange", fontWeight: "bold" }}>
                      Pending
                    </span>
                  </>
                )}
              </p>

              {/* RECEIPT */}
              {p.proof_url && (
                <img
                  src={p.proof_url}
                  alt="receipt"
                  style={{
                    width: "120px",
                    marginTop: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: `1px solid ${theme.border}`,
                  }}
                  onClick={() =>
                    window.open(
                      p.proof_url,
                      "_blank"
                    )
                  }
                />
              )}
            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {user?.role === "admin" && p.status === "pending" && (
                <button
                  onClick={() => handleApprove(p.id)}
                  style={{
                    padding: "8px 14px",
                    background: darkMode ? "#22c55e" : "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              )}

              {p.status === "approved" && (
                <span style={{ color: "limegreen" }}>✔ Approved</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPayments;