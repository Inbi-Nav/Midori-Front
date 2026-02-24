import { useEffect, useState } from "react";
import {
  getProviderOrders,
  updateOrderStatus,
} from "../../api/order.service";

const providerStatuses = [
  { value: "pending", label: "Pending", color: "status-pending" },
  { value: "processing", label: "Processing", color: "status-processing" },
  { value: "shipped", label: "Shipped", color: "status-shipped" },
  { value: "delivered", label: "Delivered", color: "status-delivered" },
];

export const ProviderOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await getProviderOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const res = await updateOrderStatus(orderId, newStatus);
      
      setOrders(prev =>
        prev.map(o => o.id === orderId ? res.data : o)
      );

    } catch (error: any) {
      alert(error.response?.data?.message || "Error al actualizar estado");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "status-pending",
      processing: "status-processing",
      shipped: "status-shipped",
      delivered: "status-delivered",
      cancelled: "status-cancelled"
    };
    return statusMap[status] || "";
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-section">
      {orders.length === 0 ? (
        <p className="no-orders">No hay pedidos recibidos</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => {
            const isLocked = ["delivered", "cancelled"].includes(order.status);

            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Pedido #{order.id}</span>
                  <span className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Cliente</span>
                    <span className="detail-value">{order.user?.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{order.user?.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total</span>
                    <span className="detail-value">€{order.total_amount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fecha</span>
                    <span className="detail-value">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {!isLocked ? (
                  <div className="order-actions">
                    <select
                      className="order-select"
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {providerStatuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    {updatingId === order.id && (
                      <span className="updating">Actualizando...</span>
                    )}
                  </div>
                ) : (
                  <p className="finalized-message">
                    Pedido finalizado - No se puede cambiar el estado
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};