import { useAuthStore } from "../../store/auth.store";
import { ClientOrders } from "../../components/orders/ClientOrders";
import { ProviderOrders } from "../../components/orders/ProviderOrders";

export const OrdersPage = () => {
  const { role } = useAuthStore();

  return (
    <div className="orders-container">
      <h1>Orders</h1>

      {role === "client" && <ClientOrders />}
      {role === "provider" && <ProviderOrders />}
    </div>
  );
};