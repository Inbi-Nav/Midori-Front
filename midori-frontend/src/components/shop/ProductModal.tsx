import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { useCartStore } from "../../store/cart.store";
import { toast } from 'react-hot-toast';
interface Props {
  product: any;
  onClose: () => void;
}
export const ProductModal = ({ product, onClose }: Props) => {
  const { addToCart } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Product added to cart', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: 'rgba(14, 22, 18, 0.95)',
        color: '#7edad0',
        border: '1px solid rgba(126, 218, 208, 0.3)',
        borderRadius: '10px',
        fontSize: '0.9rem',
      },
    });
  };
  const imageUrl = product.image_url || '/placeholder.svg';
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 10 && product.stock > 0;
  return createPortal(
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <FiX />
        </button>
        <div className="modal-grid">
          <div className="modal-image">
            <img src={imageUrl} alt={product.name} />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-price">€{product.price}</p>
            <div className="modal-meta">
              <div className="modal-meta-item">
                <span className="modal-meta-label">Material</span>
                <span className="modal-meta-value">{product.material || '—'}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Color</span>
                <span className="modal-meta-value">{product.color || '—'}</span>
              </div>
            </div>
            <p className="modal-description">{product.description || 'No description available.'}</p>
            <div className={`modal-stock ${isLowStock ? 'warning' : ''}`}>
              {isLowStock && <FiAlertTriangle />}
              {isOutOfStock ? 'Out of Stock' : `${product.stock} available`}
              {isLowStock && !isOutOfStock && ' — Almost out!'}
            </div>
            <button
              className="modal-add-to-cart"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
