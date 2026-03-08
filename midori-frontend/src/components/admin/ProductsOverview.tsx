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
    <div className="admin-content">

      <div className="table-container">

        <h2 className="table-title">Products Overview</h2>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="alert-box">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>

                  <td>
                    <strong>{product.name}</strong>
                  </td>

                  <td>€{product.price}</td>

                  <td>{product.user?.name || "N/A"}</td>

                  <td>
                    {product.stock > 10 ? (
                      <span className="status-badge delivered">
                        In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="status-badge pending">
                        Low
                      </span>
                    ) : (
                      <span className="status-badge cancelled">
                        Out
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};