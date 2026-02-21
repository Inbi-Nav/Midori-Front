
import { Navigate, useRoutes } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { HomePage } from "../pages/home/HomePage";
import { AuthPage } from "../pages/auth/AuthPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ShopPage } from "../pages/shop/ShopPage";

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuthStore();

  return useRoutes([
  { 
    path: "/", 
    element: <HomePage /> 
  },

  {
   path: "/auth/login",
   element: <AuthPage />,
  },

  {
    path: "/auth/register",
    element: <RegisterPage />,
  },

  {
      path: "/shop",
      element: isAuthenticated ? <ShopPage /> : <Navigate to="/auth/login" />,
    },
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

