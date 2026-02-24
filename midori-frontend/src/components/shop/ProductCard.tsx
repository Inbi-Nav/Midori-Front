const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
import { useCartStore } from "../../store/cart.store";
import { FiAlertTriangle } from "react-icons/fi";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      const result = addToCart(product);
      if (!result.success) {
        setError(result.message || "");
        // Limpiar error después de 3 segundos
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const imageUrl = product.image_url
    ? `${BASE_URL}/${product.image_url.replace(/^\/+/, '')}`
    : '/placeholder-image.jpg';

  return (
    <div 
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} 
      onClick={onClick}
    >
      <div className="product-image-wrapper">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
        {isLowStock && !isOutOfStock && (
          <div className="stock-badge">
            <FiAlertTriangle size={12} style={{ marginRight: '4px' }} />
            Almost Out!
          </div>
        )}
        <div className="product-hover-btn">
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART +'}
          </button>
        </div>
        {error && <div className="cart-error-tooltip">{error}</div>}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category?.name || 'Category'}</div>
        <h4 className="product-name">{product.name}</h4>
        <div className="product-price-row">
          <span className="product-price">€{product.price}</span>
        </div>
      </div>
    </div>
  );
};