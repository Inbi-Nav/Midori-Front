import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/order.service";

export const ClientOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const cancelOrder = async (orderId: number) => {
    try {
      alert("Cancelación pendiente de implementación backend");
    } catch {
      alert("No se pudo cancelar el pedido");
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div>
            <strong>Pedido #{order.id}</strong>
            <p>Estado: {order.status}</p>
          </div>

          {order.status !== "shipped" &&
           order.status !== "delivered" && (
            <button
              className="btn-outline"
              onClick={() => cancelOrder(order.id)}
            >
              Cancelar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};