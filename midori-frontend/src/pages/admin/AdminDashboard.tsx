import { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { StatsPanel } from "../../components/admin/StatsPanel";
import { UsersTable } from "../../components/admin/UsersTable";
import { ProductsOverview } from "../../components/admin/ProductsOverview";
import { OrdersOverview } from "../../components/admin/OrdersOverview";
import { ProviderRequests } from "../../components/admin/ProviderRequests";
import "../../styles/admin.css";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <StatsPanel />
            <div style={{ marginTop: '40px' }}>
              <ProviderRequests />
            </div>
          </>
        );
      
      case "users":
        return <UsersTable />;
      
      case "products":
        return <ProductsOverview />;
      
      case "orders":
        return <OrdersOverview />;
      
      case "providers":
        return <ProviderRequests />;
      
      default:
        return null;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};