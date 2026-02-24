import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { 
  FiBarChart2, 
  FiUsers, 
  FiPackage, 
  FiShoppingBag,
  FiLogOut,
  FiGrid,
  FiUserCheck
} from "react-icons/fi";
import "../../styles/admin.css";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, activeTab, onTabChange }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiBarChart2 },
    { id: "users", label: "Users", icon: FiUsers },
    { id: "products", label: "Products", icon: FiPackage },
    { id: "orders", label: "Orders", icon: FiShoppingBag },
    { id: "providers", label: "Provider Requests", icon: FiUserCheck },
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">緑</div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FiLogOut size={22} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>Admin Panel</h1>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};