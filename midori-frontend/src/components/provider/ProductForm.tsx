import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../api/provider.service";
import { getCategories } from "../../api/category.service";
import { FiUpload, FiX, FiPlusCircle } from "react-icons/fi";
import { useAuthStore } from "../../store/auth.store";
import { CategoryModal } from "./CategoryModal";

interface Props {
  product?: any;
  onSuccess: () => void;
  onCancel?: () => void;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
}

export const ProductForm = ({ product, onSuccess, onCancel }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { token } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductData>({
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: '' as any
    },
  });

  useEffect(() => {
    if (token) {
      loadCategories();
    } else {
      console.error("No hay token de autenticación");
      setLoadingCategories(false);
    }
  }, [token]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await getCategories();
      const categoriesArray = Array.isArray(res.data) ? res.data : [];
      setCategories(categoriesArray);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        stock: product.stock || 0,
        category_id: product.category_id || ''
      });
      if (product.image_url) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';
        setImagePreview(`${baseUrl}/${product.image_url.replace(/^\/+/, '')}`);
      }
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: '' as any
      });
      setImagePreview(null);
      setImage(null);
    }
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleCategoryCreated = (newCategory: any) => {
    loadCategories();
    setValue('category_id', newCategory.id);
  };

  const onSubmit = async (data: ProductData) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category_id", String(data.category_id));
      formData.append("stock", String(data.stock));
      
      if (image) {
        formData.append("image", image);
      }

      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }

      onSuccess();

    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="provider-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-header">
          <h3>{product ? "Edit Product" : "New Product"}</h3>
          {onCancel && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              <FiX size={20} />
            </button>
          )}
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            placeholder="Ej: Totoro Mug"
            {...register("name", { required: "The product name is required" })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Describe your product..."
            {...register("description", { required: "The description is required" })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (€)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price", { 
                required: "The price is required",
                min: { value: 0, message: "The price must be greater than 0" }
              })}
            />
            {errors.price && <p className="error-message">{errors.price.message}</p>}
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              placeholder="0"
              {...register("stock", { 
                required: "The stock is required",
                min: { value: 0, message: "The stock must be greater than or equal to 0" }
              })}
            />
            {errors.stock && <p className="error-message">{errors.stock.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <div className="category-select-header">
            <label>Categoría</label>
            <button 
              type="button" 
              className="btn-add-category"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <FiPlusCircle size={16} />
              <span>New Category</span>
            </button>
          </div>
          
          {loadingCategories ? (
            <p className="loading-text">Loading categories...</p>
          ) : (
            <select
              {...register("category_id", { required: "Select a category" })}
            >
              <option value="">Select a category</option>
              {categories.length > 0 ? (
                categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No categories available</option>
              )}
            </select>
          )}
          {errors.category_id && <p className="error-message">{errors.category_id.message}</p>}
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <FiUpload className="upload-icon" />
          </div>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" className="clear-image" onClick={clearImage}>
                <FiX size={20} />
              </button>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          type="submit" 
          className="profile-submit-btn"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (product ? 'Update Product' : 'Create Product')}
        </button>
      </form>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={handleCategoryCreated}
      />
    </>
  );
};