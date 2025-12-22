import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
