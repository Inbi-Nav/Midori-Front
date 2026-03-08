import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../api/category.service";

export const ProviderCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<any | null>(null);

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    if (editing) {
      await updateCategory(editing.id, { name });
      setEditing(null);
    } else {
      await createCategory({ name });
    }

    setName("");
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div>
      <h2>Manage Categories</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Category name"
      />

      <button onClick={handleSubmit}>
        {editing ? "Update" : "Create"}
      </button>

      {categories.map(cat => (
        <div key={cat.id}>
          {cat.name}

          <button
            onClick={() => {
              setEditing(cat);
              setName(cat.name);
            }}
          >
            Edit
          </button>

          <button onClick={() => handleDelete(cat.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};