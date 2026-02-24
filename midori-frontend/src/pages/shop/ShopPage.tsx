import { useEffect, useState, useRef, useCallback } from "react";
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
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({
    minPrice: null,
    maxPrice: null,
    material: null,
    color: null
  });
  const [categoryPages, setCategoryPages] = useState<{[key: string]: number}>({});
  const [animating, setAnimating] = useState<{[key: string]: boolean}>({});
  const [productsPerPage, setProductsPerPage] = useState(5);

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const gridRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const calculateProductsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width > 1400) return 5;
    if (width > 1200) return 4;
    if (width > 900) return 3;
    if (width > 700) return 2;
    return 2;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newProductsPerPage = calculateProductsPerPage();
      setProductsPerPage(newProductsPerPage);
      setCategoryPages({});
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateProductsPerPage]);

  useEffect(() => {
    setLoading(true);
    
    Promise.all([
      getProducts(),
      getCategories()
    ])
      .then(([productsRes, categoriesRes]) => {
        const productsData = productsRes.data;
        const categoriesData = categoriesRes.data;
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        
        const uniqueMaterials = [...new Set(
          productsData
            .map((p: any) => p.material)
            .filter((m: string) => m && m.trim() !== '')
        )];
        setMaterials(uniqueMaterials);
        
        const uniqueColors = [...new Set(
          productsData
            .map((p: any) => p.color)
            .filter((c: string) => c && c.trim() !== '')
        )];
        setColors(uniqueColors);
        
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (activeFilters.minPrice !== null) {
      filtered = filtered.filter(p => p.price >= activeFilters.minPrice);
    }
    if (activeFilters.maxPrice !== null) {
      filtered = filtered.filter(p => p.price <= activeFilters.maxPrice);
    }
    if (activeFilters.material) {
      filtered = filtered.filter(p => p.material === activeFilters.material);
    }
    if (activeFilters.color) {
      filtered = filtered.filter(p => p.color === activeFilters.color);
    }

    setFilteredProducts(filtered);
    setCategoryPages({});
  }, [activeFilters, products]);

  const handleProviderRequest = async () => {
    try {
      await requestProvider();
      toast.success('Solicitud enviada al administrador', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: 'rgba(20, 30, 25, 0.95)',
          color: '#b0e0d6',
          border: '2px solid #b0e0d6',
        },
      });
    } catch (error) {
      toast.error('Error al enviar solicitud');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const element = sectionRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFilter = (filters: any) => {
    setActiveFilters(filters);
  };

  const handleResetFilters = () => {
    setActiveFilters({
      minPrice: null,
      maxPrice: null,
      material: null,
      color: null
    });
  };

  const getCurrentPageProducts = (products: any[], categoryId: string) => {
    const currentPage = categoryPages[categoryId] || 0;
    const start = currentPage * productsPerPage;
    return products.slice(start, start + productsPerPage);
  };

  const handlePrevPage = (categoryId: string) => {
    if (animating[categoryId]) return;
    
    const grid = gridRefs.current[categoryId];
    if (!grid) return;
    
    setAnimating(prev => ({ ...prev, [categoryId]: true }));
    
    grid.style.transition = 'transform 0.3s ease-in-out, opacity 0.2s ease';
    grid.style.transform = 'translateX(30px)';
    grid.style.opacity = '0.3';
    
    setTimeout(() => {
      setCategoryPages(prev => ({
        ...prev,
        [categoryId]: Math.max(0, (prev[categoryId] || 0) - 1)
      }));
      
      grid.style.transition = 'none';
      grid.style.transform = 'translateX(-30px)';
      
      grid.offsetHeight;
      
      grid.style.transition = 'transform 0.3s ease-in-out, opacity 0.2s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateX(0)';
      
      setTimeout(() => {
        grid.style.transition = '';
        setAnimating(prev => ({ ...prev, [categoryId]: false }));
      }, 300);
    }, 150);
  };

  const handleNextPage = (categoryId: string, totalProducts: number) => {
    if (animating[categoryId]) return;
    
    const maxPage = Math.ceil(totalProducts / productsPerPage) - 1;
    const currentPage = categoryPages[categoryId] || 0;
    
    if (currentPage >= maxPage) return;
    
    const grid = gridRefs.current[categoryId];
    if (!grid) return;
    
    setAnimating(prev => ({ ...prev, [categoryId]: true }));
    
    grid.style.transition = 'transform 0.3s ease-in-out, opacity 0.2s ease';
    grid.style.transform = 'translateX(-30px)';
    grid.style.opacity = '0.3';
    
    setTimeout(() => {
      setCategoryPages(prev => ({
        ...prev,
        [categoryId]: (prev[categoryId] || 0) + 1
      }));
      
      grid.style.transition = 'none';
      grid.style.transform = 'translateX(30px)';
      
      grid.offsetHeight;
      
      grid.style.transition = 'transform 0.3s ease-in-out, opacity 0.2s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateX(0)';
      
      setTimeout(() => {
        grid.style.transition = '';
        setAnimating(prev => ({ ...prev, [categoryId]: false }));
      }, 300);
    }, 150);
  };

  const productsByCategory = categories
    .map(cat => ({
      ...cat,
      products: filteredProducts.filter(p => p.category_id === cat.id)
    }))
    .filter(cat => cat.products.length > 0);

  return (
    <>
      <Toaster />
      <ShopLayout
        sidebar={<SidebarIcons onProviderRequest={handleProviderRequest} />}
        topbar={
          <TopbarShop
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        }
      >
        <Filters
          materials={materials}
          colors={colors}
          onFilter={handleFilter}
          onReset={handleResetFilters}
          activeFilters={activeFilters}
        />

        {loading && <div className="loading-skeleton">Loading items...</div>}

        {!loading && productsByCategory.length === 0 && (
          <div className="loading-skeleton">No products found</div>
        )}

        <div className="shop-content">
          {!loading && productsByCategory.map((section) => {
            const currentProducts = getCurrentPageProducts(section.products, section.id);
            const totalPages = Math.ceil(section.products.length / productsPerPage);
            const currentPage = categoryPages[section.id] || 0;
            const hasNextPage = currentPage < totalPages - 1;

            return (
              <section 
                key={section.id} 
                className="category-section"
                ref={el => sectionRefs.current[section.id] = el}
                id={`category-${section.id}`}
              >
                <div className="section-header">
                  <h2>{section.name}</h2>
                </div>

                <div className="product-grid-container">
                  <button 
                    className={`grid-arrow left ${currentPage === 0 ? 'hidden' : ''}`}
                    onClick={() => handlePrevPage(section.id)}
                    disabled={currentPage === 0 || animating[section.id]}
                    aria-label="Previous page"
                  >
                    ←
                  </button>

                  <div 
                    className="product-grid"
                    ref={el => gridRefs.current[section.id] = el}
                    style={{
                      gridTemplateColumns: `repeat(${productsPerPage}, 1fr)`
                    }}
                  >
                    {currentProducts.map((product: any) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>

                  <button 
                    className={`grid-arrow right ${!hasNextPage ? 'hidden' : ''}`}
                    onClick={() => handleNextPage(section.id, section.products.length)}
                    disabled={!hasNextPage || animating[section.id]}
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </ShopLayout>

      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};