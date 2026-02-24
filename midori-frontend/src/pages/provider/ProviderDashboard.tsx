import { useState } from "react";
import { ProviderLayout } from "../../components/provider/providerLayout";
import { ProductForm } from "../../components/provider/ProductForm";
import { ProviderProducts } from "../../components/provider/ProviderProducts";
import { ProviderOrders } from "../../components/orders/ProviderOrders";
import { CategoriesManager } from "../../components/provider/CategoriesManager";
import "../../styles/provider.css";

export const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div className="provider-section">
            <h2 className="section-title">All Products</h2>
            <ProviderProducts />
          </div>
        );
      
      case "new-product":
        return (
          <div className="provider-section">
            <h2 className="section-title">New Product</h2>
            <ProductForm onSuccess={() => setActiveTab("products")} />
          </div>
        );
      
      case "orders":
        return (
          <div className="provider-section">
            <h2 className="section-title">Received Orders</h2>
            <ProviderOrders />
          </div>
        );
      
      case "categories":
        return (
          <div className="provider-section">
            <h2 className="section-title">Manage Categories</h2>
            <CategoriesManager />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <ProviderLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </ProviderLayout>
  );
};