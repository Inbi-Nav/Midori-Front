import { useEffect, useState } from "react";
import {
  getProviderOrders,
  updateOrderStatus,
} from "../../api/order.service";

const providerStatuses = [
  "processing",
  "shipped",
  "delivered",
];

export const ProviderOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getProviderOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders");
    }
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: string
  ) => {
    try {
      setLoadingId(orderId);

      const res = await updateOrderStatus(orderId, newStatus);

      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? res.data
            : o
        )
      );

    } catch (error: any) {
      alert(error.response?.data?.message || "Status update failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2>Received Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map(order => {
        const isLocked = ["delivered", "cancelled"].includes(order.status);

        return (
          <div
            key={order.id}
            className="order-card"
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <strong>Order #{order.id}</strong>

            <p>Customer: {order.user?.name}</p>
            <p>Status: <strong>{order.status}</strong></p>

            {!isLocked ? (
              <select
                value={order.status}
                disabled={loadingId === order.id}
                onChange={(e) =>
                  handleStatusChange(order.id, e.target.value)
                }
              >
                {providerStatuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <p style={{ color: "gray" }}>
                Order is finalized
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};