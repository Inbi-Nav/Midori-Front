import { useCartStore } from "../../store/cart.store";
import { FiTrash2, FiMinus, FiPlus, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

export const CartItem = ({ item }: any) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const [error, setError] = useState("");

  // Asegurar que el precio sea número
  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
  const stock = typeof item.stock === 'number' ? item.stock : parseInt(item.stock) || 0;
  const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 1;

  const handleDecrease = () => {
    if (quantity > 1) {
      const result = updateQuantity(item.id, quantity - 1);
      if (!result.success) {
        setError(result.message || "");
      } else {
        setError("");
      }
    }
  };

  const handleIncrease = () => {
    const result = updateQuantity(item.id, quantity + 1);
    if (!result.success) {
      setError(result.message || "");
    } else {
      setError("");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      const result = updateQuantity(item.id, value);
      if (!result.success) {
        setError(result.message || "");
      } else {
        setError("");
      }
    }
  };

  const imageUrl = item.image_url
    ? `${BASE_URL}/${item.image_url.replace(/^\/+/, '')}`
    : '/placeholder-image.jpg';

  const isLowStock = stock <= 5 && stock > 0;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={imageUrl} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-header">
          <div>
            <h3 className="cart-item-name">{item.name}</h3>
            {isLowStock && (
              <span className="low-stock-badge">
                <FiAlertTriangle size={12} />
                Only {stock} unidades disponibles
              </span>
            )}
          </div>
          <span className="cart-item-price">€{price.toFixed(2)}</span>
        </div>

        <div className="cart-item-controls">
          <div className="quantity-control">
            <button 
              className="quantity-btn"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <FiMinus size={16} />
            </button>
            
            <input
              type="number"
              value={quantity}
              min="1"
              max={stock}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            
            <button 
              className="quantity-btn"
              onClick={handleIncrease}
              disabled={quantity >= stock}
            >
              <FiPlus size={16} />
            </button>
          </div>

          {error && <span className="stock-error">{error}</span>}

          <button 
            className="btn-remove"
            onClick={() => removeFromCart(item.id)}
          >
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>

        <div className="stock-info">
        </div>
      </div>
    </div>
  );
};