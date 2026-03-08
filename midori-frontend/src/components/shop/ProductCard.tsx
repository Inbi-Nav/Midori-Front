import { useCartStore } from "../../store/cart.store";
import { FiShoppingCart, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";
interface Props {
  product: any;
  onClick: () => void;
}
export const ProductCard = ({ product, onClick }: Props) => {
  const { addToCart } = useCartStore();
  const [error, setError] = useState("");
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 10 && product.stock > 0;
  const imageUrl = product.image_url || '/placeholder.svg';
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      const result = addToCart(product);
      if (!result.success) {
        setError(result.message || "");
        setTimeout(() => setError(""), 3000);
      }
    }
  };
  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={onClick}>
      <div className="product-image-wrapper">
        <img className="product-image" src={imageUrl} alt={product.name} loading="lazy" />
        {isLowStock && !isOutOfStock && (
          <div className="stock-badge">
            <FiAlertTriangle size={12} />
            Low Stock
          </div>
        )}
        {isOutOfStock && (
          <div className="stock-badge">
            OUT OF STOCK
          </div>
        )}
      </div>
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <div className="product-price-row">
          <span className="product-price">€{product.price}</span>
          <button
            className="product-cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label="Add to cart"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
      {error && <div className="cart-error-tooltip">{error}</div>}
    </div>
  );
};
