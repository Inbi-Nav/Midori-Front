import { useEffect, useState } from "react";
import { deleteProduct } from "../../api/provider.service";
import { getProducts } from "../../api/product.service";
import { ProductForm } from "./ProductForm";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

export const ProviderProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product");
      }
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
    setTimeout(() => {
      document.querySelector('.provider-form')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
    setTimeout(() => {
      document.querySelector('.provider-form')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="provider-products">
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => {
            const imageUrl = product.image_url || '/placeholder-image.jpg';

            return (
              <div key={product.id} className="product-card">
                <div className="product-card-image">
                  <img src={imageUrl} alt={product.name} />
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">{product.name}</h3>
                  <div className="product-card-price">€{product.price}</div>
                  <div className="product-card-stock">
                    Stock: {product.stock}
                  </div>
                  <div className="product-card-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                    >
                      <FiEdit2 size={16} /> Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};