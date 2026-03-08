interface Props {
  categories: any[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string | null) => void;
}
export const TopbarShop = ({ categories, activeCategory, onCategoryClick }: Props) => {
  return (
    <div className="shop-topbar">
      <div className="topbar-row">
        <span className="logo">Midori</span>
      </div>
      <div className="category-pills">
        <button
          className={`pill ${activeCategory === null ? 'active' : ''}`}
          onClick={() => onCategoryClick(null)}
        >
          ALL
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`pill ${activeCategory === cat.id.toString() ? 'active' : ''}`}
            onClick={() => onCategoryClick(cat.id.toString())}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
