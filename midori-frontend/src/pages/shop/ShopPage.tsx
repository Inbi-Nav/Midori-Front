import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.service";
import { ShopLayout } from "../../components/shop/ShopLayout";
import { SidebarCategories } from "../../components/shop/SidebarCategories";
import { TopbarShop } from "../../components/shop/TopbarShop";
import { ProductCard } from "../../components/shop/ProductCard";
import { Filters } from "../../components/shop/Filters";

export const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    getProducts(params)
      .then(res => setProducts(res.data))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <ShopLayout
      sidebar={
        <SidebarCategories
          onSelectCategory={(id) =>
            setParams(prev => ({ ...prev, category_id: id }))
          }
        />
      }
      topbar={<TopbarShop />}
    >
      <Filters
        onFilter={(min, max) =>
          setParams(prev => ({ ...prev, min_price: min, max_price: max }))
        }
      />

      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}

      <div className="product-grid">
        {products.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </ShopLayout>
  );
};