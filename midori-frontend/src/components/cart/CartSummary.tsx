import { useCartStore } from "../../store/cart.store";
import axios from "../../api/axios";

export const CartSummary = () => {
  const { items, total, clearCart } = useCartStore();

  const handleCheckout = async () => {
    try {
      await axios.post("/orders", {
        items: items.map(i => ({
          product_id: i.id,
          quantity: i.quantity,
        })),
      });

      clearCart();
      alert("Pedido creado correctamente");
    } catch {
      alert("Error al crear pedido");
    }
  };

  return (
    <div className="cart-summary">
      <h3>Total: €{total()}</h3>
      <button onClick={handleCheckout}>
        Finalizar Pedido
      </button>
    </div>
  );
};