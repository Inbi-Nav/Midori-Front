import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
interface Props {
  materials: string[];
  colors: string[];
  onFilter: (filters: any) => void;
  onReset: () => void;
  activeFilters: any;
}
export const Filters = ({ materials, colors, onFilter, onReset, activeFilters }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [min, setMin] = useState(activeFilters.minPrice || "");
  const [max, setMax] = useState(activeFilters.maxPrice || "");
  const [material, setMaterial] = useState(activeFilters.material || "");
  const [color, setColor] = useState(activeFilters.color || "");
  const handleApply = () => {
    onFilter({
      minPrice: min ? Number(min) : null,
      maxPrice: max ? Number(max) : null,
      material: material || null,
      color: color || null
    });
  };
  const handleReset = () => {
    setMin("");
    setMax("");
    setMaterial("");
    setColor("");
    onReset();
  };
  return (
    <div className="filters-wrapper">
      <button className="filters-toggle" onClick={() => setIsOpen(!isOpen)}>
        FILTERS
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      <div className={`filters-panel ${isOpen ? 'open' : ''}`}>
        <div className="filters-bar">
          <div className="filter-group">
            <span className="filter-label">Price</span>
            <div className="range-slider">
              <input type="number" placeholder="Min" value={min} onChange={e => setMin(e.target.value)} />
              <span>—</span>
              <input type="number" placeholder="Max" value={max} onChange={e => setMax(e.target.value)} />
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Material</span>
            <select className="filter-dropdown" value={material} onChange={e => setMaterial(e.target.value)}>
              <option value="">All Materials</option>
              {materials.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Color</span>
            <select className="filter-dropdown" value={color} onChange={e => setColor(e.target.value)}>
              <option value="">All Colors</option>
              {colors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button className="apply-filters-btn" onClick={handleApply}>APPLY</button>
          <button className="reset-filters-btn" onClick={handleReset}>RESET</button>
        </div>
      </div>
    </div>
  );
};
