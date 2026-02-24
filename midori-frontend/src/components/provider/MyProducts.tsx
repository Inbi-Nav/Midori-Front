import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.service";
import { deleteProduct } from "../../api/provider.service";

export const MyProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div>
      <h2>My Products</h2>

      {products.map(product => (
        <div key={product.id}>
          {product.name} - €{product.price}
          <button onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};