import { useEffect, useState } from "react";
import { getCategories } from "../../api/category.service";

interface Props {
  onSelectCategory: (id: number | null) => void;
}

export const SidebarCategories = ({ onSelectCategory }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>Categories</h3>

      {loading && <p>Loading...</p>}

      <ul className="category-list">
        <li onClick={() => onSelectCategory(null)}>All</li>
        {categories.map(cat => (
          <li key={cat.id} onClick={() => onSelectCategory(cat.id)}>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};