import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { user } = useUser();

  if (adminOnly) {
    return user && user.isAdmin ? element : <Navigate to="/login" />;
  }

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
