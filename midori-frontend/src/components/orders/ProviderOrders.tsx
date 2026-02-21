import { useEffect, useState } from "react";
import {
  getProviderOrders,
  updateOrderStatus,
} from "../../api/order.service";

export const ProviderOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getProviderOrders()
      .then(res => setOrders(res.data));
  }, []);

  const handleStatusChange = async (
    orderId: number,
    newStatus: string
  ) => {
    await updateOrderStatus(orderId, newStatus);

    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: newStatus }
          : o
      )
    );
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div>
            <strong>Pedido #{order.id}</strong>
            <p>Cliente: {order.user?.name}</p>
            <p>Estado actual: {order.status}</p>
          </div>

          <select
            value={order.status}
            onChange={(e) =>
              handleStatusChange(order.id, e.target.value)
            }
          >
            <option value="pending">Pendiente</option>
            <option value="processing">En proceso</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
          </select>
        </div>
      ))}
    </div>
  );
};