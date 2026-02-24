import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export const RoleRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  if (!allowedRoles.includes(role || "")) {
    return <Navigate to="/" />;
  }

  return children;
};