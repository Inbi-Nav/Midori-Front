import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/admin.service";

export const ProductsOverview = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-section">
      <h2>Products Overview</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>€{product.price}</td>
                <td>{product.user?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};