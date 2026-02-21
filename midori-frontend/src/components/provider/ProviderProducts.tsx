import { useEffect, useState } from "react";
import { deleteProduct } from "../../api/provider.service";
import { getProducts } from "../../api/product.service";
import { ProductForm } from "./ProductForm";

export const ProviderProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const fetchProducts = () => {
    getProducts().then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <ProductForm
        product={editingProduct}
        onSuccess={() => {
          setEditingProduct(null);
          fetchProducts();
        }}
      />

      <h2>Mis Productos</h2>

      {products.map(prod => (
        <div key={prod.id}>
          {prod.name} - €{prod.price}
          <button onClick={() => setEditingProduct(prod)}>Editar</button>
          <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};