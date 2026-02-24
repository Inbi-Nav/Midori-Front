interface Props {
  categories: any[];
  onCategoryClick: (categoryId: string) => void;
}

export const TopbarShop = ({ categories, onCategoryClick }: Props) => {
  return (
    <div className="shop-topbar">
      <div className="topbar-row">
        <div className="logo">Midori</div>
      </div>

      <div className="category-pills">
        {categories.map(cat => (
          <button
            key={cat.id}
            className="pill"
            onClick={() => onCategoryClick(cat.id.toString())}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};