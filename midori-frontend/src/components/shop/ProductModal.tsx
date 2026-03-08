import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { useCartStore } from "../../store/cart.store";
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

interface Props {
  product: any;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: Props) => {
  const { addToCart } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
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
        background: 'rgba(20, 30, 25, 0.95)',
        color: '#b0e0d6',
        border: '2px solid #b0e0d6',
      },
    });
  };


  const imageUrl = product.image_url || '/placeholder-image.jpg';


  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 10 && product.stock > 0;

  return createPortal(
    <div className={`modal-overlay ${isVisible ? 'active' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <FiX size={24} />
        </button>

        <div className="modal-grid">
          <div className="modal-image">
            <img src={imageUrl} alt={product.name} />
          </div>

          <div className="modal-details">
            <h2>{product.name}</h2>
            <div className="modal-price">€{product.price}</div>
            
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
              {isLowStock && <FiAlertTriangle size={20} />}
              {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock} available`}
              {isLowStock && !isOutOfStock && ' - Almost out of stock!'}
            </div>

            <button
              className="modal-add-to-cart"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART +'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};