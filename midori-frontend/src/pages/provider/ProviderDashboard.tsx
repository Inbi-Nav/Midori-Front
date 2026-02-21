import { ProviderProducts } from "../../components/provider/ProviderProducts";
import { ProviderOrders } from "../../components/orders/ProviderOrders";
import { ProductForm } from "../../components/provider/ProductForm";
import { MyProducts } from "../../components/provider/MyProducts";


export const ProviderDashboard = () => {
  return (
    <div className="provider-dashboard">

      <h1>Panel de Proveedor</h1>

      <section>
        <ProductForm />
        <MyProducts />
      </section>

      <section style={{ marginTop: "60px" }}>
        <h2>Pedidos Recibidos</h2>
        <ProviderOrders />
      </section>

    </div>
  );
};