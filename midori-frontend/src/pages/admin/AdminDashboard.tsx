import { UsersTable } from "../../components/admin/UsersTable";
import { ProductsOverview } from "../../components/admin/ProductsOverview";
import { OrdersOverview } from "../../components/admin/OrdersOverview";
import { ProviderRequests } from "../../components/admin/ProviderRequests";
import { StatsPanel } from "../../components/admin/StatsPanel";

export const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>

      <StatsPanel />
      <ProviderRequests />
      <UsersTable />
      <ProductsOverview />
      <OrdersOverview />
    </div>
  );
};