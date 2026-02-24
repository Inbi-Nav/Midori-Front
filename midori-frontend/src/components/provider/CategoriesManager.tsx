import { useEffect, useState } from "react";
import { 
  getCategories, 
  updateCategory, 
  deleteCategory 
} from "../../api/category.service";
import { getProducts } from "../../api/product.service";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useAuthStore } from "../../store/auth.store";

export const CategoriesManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      loadData();
    } else {
      console.error("No auth token found. Cannot load categories.");
      setLoading(false);
    }
  }, [token]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, productsRes] = await Promise.all([
        getCategories(),
        getProducts()
      ]);
      
      const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
      const productsData = Array.isArray(productsRes.data) ? productsRes.data : [];
      
      const productsByCategory = productsData.reduce((acc: any, product: any) => {
        if (product.category_id) {
          acc[product.category_id] = (acc[product.category_id] || 0) + 1;
        }
        return acc;
      }, {});
      
      const categoriesWithCount = categoriesData.map((cat: any) => ({
        ...cat,
        products_count: productsByCategory[cat.id] || 0
      }));
      
      setCategories(categoriesWithCount);
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading data", error);
      setCategories([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ 
      name: category.name || "", 
      description: category.description || "" 
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    try {
      setError("");
      await updateCategory(editingCategory.id, formData);
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating category");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        await loadData();
      } catch (err: any) {
        alert(err.response?.data?.message || "Error deleting category");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setError("");
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="categories-manager">
      <div className="categories-header">
      </div>

      {editingCategory && (
        <form onSubmit={handleUpdate} className="category-form edit-form">
          <div className="form-header">
            <h3>Editing Category: {editingCategory.name}</h3>
            <button 
              type="button" 
              className="btn-icon cancel" 
              onClick={handleCancelEdit}
              title="Cancel editing"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Home Decor"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the category..."
              rows={3}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Update Category
            </button>
          </div>
        </form>
      )}

      <div className="categories-list">
        <h3>Existing Categories</h3>
        {categories.length === 0 ? (
          <p className="no-categories">No categories created yet</p>
        ) : (
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-card-header">
                  <h4 className="category-name">{category.name}</h4>
                  <span className="category-badge">
                    {category.products_count || 0} product
                  </span>
                </div>
                {category.description && (
                  <p className="category-description">{category.description}</p>
                )}
                <div className="category-actions">
                  <button 
                    className="btn-icon edit"
                    onClick={() => handleEdit(category)}
                    title="Editar categoría"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    className="btn-icon delete"
                    onClick={() => handleDelete(category.id)}
                    title="Eliminar categoría"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};