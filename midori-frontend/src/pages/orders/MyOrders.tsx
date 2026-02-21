import { useEffect, useState } from "react";
import axios from "../../api/axios";

export const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/orders/me")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Mis Pedidos</h2>

      {orders.map(order => (
        <div key={order.id}>
          Pedido #{order.id} — {order.status}
        </div>
      ))}
    </div>
  );
};