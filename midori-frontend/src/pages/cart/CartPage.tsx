import { useCartStore } from "../../store/cart.store";
import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import "../../styles/cart.css";
export const CartPage = () => {
  const { items } = useCartStore();

  return (
    <div className="cart-container">
      <h1>Mi Cesta</h1>

      {items.length === 0 && <p>Tu cesta está vacía</p>}

      {items.map(item => (
        <CartItem key={item.id} item={item} />
    ))}
      <CartSummary />
    </div>
  );
};