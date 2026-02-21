const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

interface Props {
  product: any;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
    <div className="product-image">
<img src={`${BASE_URL}/${product.image_url.replace(/^\/+/, '')}`} alt={product.name}/>  
</div>
    <div className="product-info">
    <h4>{product.name}</h4>
    <p>€{product.price}</p>
  </div>
</div>
  );
};