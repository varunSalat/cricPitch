import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
