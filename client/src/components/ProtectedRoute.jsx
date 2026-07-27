import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader" />
        <span>Restoring secure session</span>
      </main>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
