import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { 
  FiPackage, 
  FiShoppingBag, 
  FiLogOut, 
  FiGrid,
  FiPlusCircle,
  FiList
} from "react-icons/fi";
import "../../styles/provider.css";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProviderLayout = ({ children, activeTab, onTabChange }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menuItems = [
    { id: "products", label: "Products", icon: FiPackage },
    { id: "new-product", label: "New Product", icon: FiPlusCircle },
    { id: "orders", label: "Received Orders", icon: FiShoppingBag },
    { id: "categories", label: "Categories", icon: FiGrid },
  ];

  return (
    <div className="provider-container">
      <aside className="provider-sidebar">
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

      <main className="provider-main">

        <div className="provider-content">
          {children}
        </div>
      </main>
    </div>
  );
};