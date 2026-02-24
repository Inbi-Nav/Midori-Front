import { useCartStore } from "../../store/cart.store";
import { createOrder } from "../../api/order.service";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";

export const CartSummary = () => {
  const { items, clearCart, total, hasStockIssues } = useCartStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = total();
  
  const shipping = subtotal > 50 ? 0 : 4.99;
  const totalAmount = subtotal + shipping;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (hasStockIssues()) {
      setError("There are items in your cart that exceed available stock. Please adjust quantities before checkout.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createOrder({
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      navigate("/orders");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error processing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  const hasIssues = hasStockIssues();

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>
      
      {hasIssues && (
        <div className="summary-warning">
          <FiAlertTriangle size={16} />
          <span>Some products exceed available stock</span>
        </div>
      )}

      {error && (
        <div className="summary-error">
          <FiAlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="summary-row">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value">€{subtotal.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span className="summary-label">Shipping</span>
        <span className="summary-value">
          {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
        </span>
      </div>
      
      <div className="summary-row total">
        <span className="summary-label">Total</span>
        <span className="summary-value">€{totalAmount.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0 || hasIssues || loading}
        className="btn-checkout"
      >
        {loading ? 'Procesando...' : 'Finalizar pedido'}
      </button>

      <Link to="/shop" className="continue-shopping">
        <FiArrowLeft size={16} />
        Continue shopping
      </Link>
    </div>
  );
};