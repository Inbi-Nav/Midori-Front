import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/admin.service";

export const OrdersOverview = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Error cargando pedidos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-section">
      <h2>Supervisión de Pedidos</h2>

      {loading && <p>Cargando pedidos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.user?.name}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};