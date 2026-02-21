import { useEffect, useState } from "react";
import axios from "../../api/axios";

export const ProviderOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/orders")
      .then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`/orders/${id}/status`, { status });

    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <div>
      <h2>Pedidos Recibidos</h2>

      {orders.map(order => (
        <div key={order.id}>
          #{order.id} — {order.status}

          <select
            onChange={(e) =>
              updateStatus(order.id, e.target.value)
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