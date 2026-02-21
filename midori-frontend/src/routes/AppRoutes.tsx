
import { Navigate, useRoutes } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { HomePage } from "../pages/home/HomePage";

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuthStore();

  return useRoutes([
    { path: "/", element: <HomePage /> },

    { path: "auth/login", element: <div>Login Placeholder</div> },
    { path: "auth/register", element: <div>Register Placeholder</div> },

    {
      path: "dashboard",
      element: isAuthenticated ? <div>Dashboard</div> : <Navigate to="/auth/login" />,
    },

    {
      path: "admin",
      element:
        isAuthenticated && user?.role === "admin" ? <div>Admin Dashboard</div> : <Navigate to="/auth/login" />,
    },

    { path: "*", element: <div>404 Not Found</div> },
  ]);
};

