import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../api/provider.service";
import { getCategories } from "../../api/category.service";

interface Props {
  product?: any;
  onSuccess: () => void;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;   // 👈 AÑADIR ESTO
  category_id: number;
}

export const ProductForm = ({ product, onSuccess }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductData>({
    defaultValues: product || {},
  });

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ProductData) => {
    try {
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
      reset();
      setImage(null);

    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar producto");
    }
  };

  return (
    <form className="provider-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{product ? "Editar Producto" : "Nuevo Producto"}</h3>

      <input
        placeholder="Nombre"
        {...register("name", { required: "Nombre obligatorio" })}
      />
      <p className="error">{errors.name?.message}</p>

        <input type="number" placeholder="Stock"
      {...register("stock", { required: "Stock obligatorio" })}/>
      <p className="error">{errors.stock?.message}</p>
      
      <textarea
        placeholder="Descripción"
        {...register("description", { required: "Descripción obligatoria" })}
      />
      <p className="error">{errors.description?.message}</p>

      <input
        type="number"
        placeholder="Precio"
        {...register("price", { required: "Precio obligatorio" })}
      />
      <p className="error">{errors.price?.message}</p>

      <select
        {...register("category_id", { required: "Selecciona categoría" })}
      >
        <option value="">Seleccionar categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <p className="error">{errors.category_id?.message}</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          style={{ width: 120, marginTop: 10 }}
        />
      )}

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn-primary-full">
        {product ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};