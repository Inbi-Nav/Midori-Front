import { useState } from "react";

interface Props {
  onFilter: (min?: number, max?: number) => void;
}

export const Filters = ({ onFilter }: Props) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div className="filters">
      <input
        type="number"
        placeholder="Precio mínimo"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />

      <button
        onClick={() =>
          onFilter(Number(min) || undefined, Number(max) || undefined)
        }
      >
        Aplicar
      </button>
    </div>
  );
};