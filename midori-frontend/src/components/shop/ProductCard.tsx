const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
import { useCartStore } from "../../store/cart.store";

interface Props {
  product: any;
}


export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartStore();  

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={`${BASE_URL}/${product.image_url.replace(/^\/+/, '')}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <p>€{product.price}</p>

        <button onClick={() => addToCart(product)}>
          Añadir a la cesta
        </button>
      </div>
    </div>
  );
};