import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../api/product.service";
import { getCategories } from "../../api/category.service";
import { requestProvider } from "../../api/client.service";
import { ShopLayout } from "../../components/shop/ShopLayout";
import { TopbarShop } from "../../components/shop/TopbarShop";
import { ProductCard } from "../../components/shop/ProductCard";
import { Filters } from "../../components/shop/Filters";
import { SidebarIcons } from "../../components/shop/SidebarIcons";
import { ProductModal } from "../../components/shop/ProductModal";
import { Toaster, toast } from 'react-hot-toast';
import "../../styles/shop-ghibli.css";
export const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    material: null as string | null,
    color: null as string | null,
  });
  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        const productsData = productsRes.data?.data || productsRes.data || [];
        const categoriesData = categoriesRes.data || [];
        setProducts(productsData);
        setCategories(categoriesData);
        const uniqueMaterials = [...new Set(
          productsData.map((p: any) => p.material).filter((m: string) => m && m.trim() !== '')
        )] as string[];
        setMaterials(uniqueMaterials);
        const uniqueColors = [...new Set(
          productsData.map((p: any) => p.color).filter((c: string) => c && c.trim() !== '')
        )] as string[];
        setColors(uniqueColors);
      })
      .catch(err => console.error("Error loading data", err))
      .finally(() => setLoading(false));
  }, []);
  const filteredProducts = products.filter(p => {
    if (activeCategory !== null && p.category_id?.toString() !== activeCategory) return false;
    if (activeFilters.minPrice !== null && p.price < activeFilters.minPrice) return false;
    if (activeFilters.maxPrice !== null && p.price > activeFilters.maxPrice) return false;
    if (activeFilters.material && p.material !== activeFilters.material) return false;
    if (activeFilters.color && p.color !== activeFilters.color) return false;
    return true;
  });
  const handleProviderRequest = async () => {
    try {
      await requestProvider();
      toast.success('Request sent to admin', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: 'rgba(14, 22, 18, 0.95)',
          color: '#7edad0',
          border: '1px solid rgba(126, 218, 208, 0.3)',
          borderRadius: '10px',
        },
      });
    } catch {
      toast.error('Error sending request');
    }
  };
  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };
  return (
    <>
      <Toaster />
      <ShopLayout
        sidebar={<SidebarIcons onProviderRequest={handleProviderRequest} />}
        topbar={
          <TopbarShop
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
        }
      >
        <Filters
          materials={materials}
          colors={colors}
          onFilter={setActiveFilters}
          onReset={() => setActiveFilters({ minPrice: null, maxPrice: null, material: null, color: null })}
          activeFilters={activeFilters}
        />
        {loading && <div className="shop-loading">Loading products...</div>}
        {!loading && filteredProducts.length === 0 && (
          <div className="shop-empty">No products found</div>
        )}
        {!loading && filteredProducts.length > 0 && (
          <>
            <div className="results-bar">
              <span className="results-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="products-grid">
              {filteredProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </>
        )}
      </ShopLayout>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
