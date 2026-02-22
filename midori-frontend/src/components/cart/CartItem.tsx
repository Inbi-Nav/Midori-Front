import { useCartStore } from "../../store/cart.store";

export const CartItem = ({ item }: any) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="cart-item">
      <img src={`http://localhost:8000${item.image_url}`} />

      <div>
        <h4>{item.name}</h4>
        <p>€{item.price}</p>

        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) =>
            updateQuantity(item.id, Number(e.target.value))
          }
        />

        <button onClick={() => removeFromCart(item.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};