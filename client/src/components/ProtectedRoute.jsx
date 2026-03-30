import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { token, user, loading } = useContext(AuthContext);

  // ⏳ Wait for auth to load
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role check (ADMIN)
  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;