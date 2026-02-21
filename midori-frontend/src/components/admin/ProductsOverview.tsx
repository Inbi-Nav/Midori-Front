import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/admin.service";

export const ProductsOverview = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Error cargando productos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-section">
      <h2>Supervisión de Productos</h2>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>€{product.price}</td>
                <td>{product.provider?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};