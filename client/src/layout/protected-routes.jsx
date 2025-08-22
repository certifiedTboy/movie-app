import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoutes;
