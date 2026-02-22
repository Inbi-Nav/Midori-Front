import { useCartStore } from "../../store/cart.store";
import { createOrder } from "../../api/order.service";
import { useNavigate } from "react-router-dom";

export const CartSummary = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;

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
      alert(error.response?.data?.message || "Error al crear pedido");
    }
  };

  return (
    <div className="cart-summary">
      <h3>Total: €{total.toFixed(2)}</h3>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className={items.length === 0 ? "disabled" : ""}
      >
        Finalizar pedido
      </button>
    </div>
  );
};