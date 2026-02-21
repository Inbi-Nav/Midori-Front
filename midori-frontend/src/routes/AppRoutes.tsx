
import { Navigate, useRoutes } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { HomePage } from "../pages/home/HomePage";
import { AuthPage } from "../pages/auth/AuthPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ShopPage } from "../pages/shop/ShopPage";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { RoleRoute } from "./RoleRoutes";
import { ProviderDashboard } from "../pages/provider/ProviderDashboard";

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
      path: "/admin",
      element: (
        <RoleRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </RoleRoute>
      ),
    },

    // 🌿 PROVIDER
    {
      path: "/provider",
      element: (
        <RoleRoute allowedRoles={["provider"]}>
          <ProviderDashboard />
        </RoleRoute>
      ),
    },

    { path: "*", element: <div>404 Not Found</div> },
  ]);
};

