import { useEffect, useState } from "react";
import {
  getMyOrders,
  cancelOrder,
} from "../../api/order.service";

export const ClientOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error loading orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId: number) => {
    try {
      setLoadingId(orderId);
      await cancelOrder(orderId);
      await fetchOrders();
    } catch (err: any) {
      alert(err.response?.data?.message || "Cancel failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map(order => (
        <div key={order.id} className="order-card">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> €{order.total_amount}</p>
          <p><strong>Status:</strong> {order.status}</p>

          {["pending", "processing"].includes(order.status) && (
            <button
              onClick={() => handleCancel(order.id)}
              disabled={loadingId === order.id}
            >
              {loadingId === order.id
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};