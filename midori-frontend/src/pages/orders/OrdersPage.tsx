import { useAuthStore } from "../../store/auth.store";
import { ClientOrders } from "../../components/orders/ClientOrders";
import { ProviderOrders } from "../../components/orders/ProviderOrders";
import { ShopLayout } from "../../components/shop/ShopLayout";
import { SidebarIcons } from "../../components/shop/SidebarIcons";
import "../../styles/orders.css";

export const OrdersPage = () => {
  const { role } = useAuthStore();

  return (
    <ShopLayout
      sidebar={<SidebarIcons onProviderRequest={() => {}} />}
      topbar={null}
    >
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
        </div>

        <div className="orders-content">
          {role === "client" && <ClientOrders />}
          {role === "provider" && <ProviderOrders />}
        </div>
      </div>
    </ShopLayout>
  );
};