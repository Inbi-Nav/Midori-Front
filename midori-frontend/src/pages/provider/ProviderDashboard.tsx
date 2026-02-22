import { ProviderProducts } from "../../components/provider/ProviderProducts";
import { ProviderOrders } from "../../components/orders/ProviderOrders";
import { ProductForm } from "../../components/provider/ProductForm";
import { MyProducts } from "../../components/provider/MyProducts";

export const ProviderDashboard = () => {
  return (
    <div className="provider-dashboard">

      <h1>Provider Dashboard</h1>

      <section>
        <h2>Manage Products</h2>
        <ProductForm />
        <MyProducts />
      </section>

      <section style={{ marginTop: "60px" }}>
        <ProviderOrders />
      </section>

    </div>
  );
};