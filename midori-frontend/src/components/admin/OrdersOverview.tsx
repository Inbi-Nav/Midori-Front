import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/admin.service";

export const OrdersOverview = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Error loading orders"))
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "status-badge pending",
      processing: "status-badge processing",
      shipped: "status-badge shipped",
      delivered: "status-badge delivered",
      cancelled: "status-badge cancelled"
    };
    return statusMap[status] || "status-badge pending";
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Recent Orders</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 5).map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user?.name}</td>
              <td>€{order.total_amount}</td>
              <td>
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};