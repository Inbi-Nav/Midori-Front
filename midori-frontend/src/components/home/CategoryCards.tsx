import { motion } from "framer-motion";
import "./CategoryCards.css";
import ghibliCollectionImg from "../../assets/Studio-ghibli.png";
import TeaCollectionImg from "../../assets/Tea-colections.png";
import HomeLivingCollection from "../../assets/HomeLiving.png";


// Imágenes representativas para cada categoría
const categoryImages = {
  "Home Decor": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format",
  "Studio Ghibli Collections": "../../assets/Studio-ghibli.png",
  "Tea Collections": "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c6?w=500&auto=format"
};

const categories = [
  {
    id: 1,
    name: "Home Decor",
    description: "Decorative pieces for homes.",
    image: HomeLivingCollection,
    color: "rgba(255, 200, 220, 0.3)"
  },
  {
    id: 2,
    name: "Studio Ghibli Collections",
    description: "Lifestyle and decorative pieces inspired by Studio Ghibli.",
    image: ghibliCollectionImg,
    color: "rgba(180, 240, 255, 0.3)"
  },
  {
    id: 3,
    name: "Tea Collections",
    description: "Teas and accessories for tea rituals.",
  
    image: TeaCollectionImg,
    color: "rgba(210, 180, 255, 0.3)"
  }
];

export const CategoryCards = () => {
  return (
    <motion.section 
      className="categories-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-50px" }}
    >
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Categorías
        </motion.h2>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="category-card-glass"
                style={{
                  background: `linear-gradient(135deg, ${category.color} 0%, rgba(255,255,255,0.1) 100%)`
                }}
              >
                <div className="category-image-container">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="category-image"
                  />
                  <div 
                    className="category-glow"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color.replace('0.3', '0.5')}, transparent 70%)`
                    }}
                  ></div>
                </div>
                
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <motion.button 
                    className="category-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explorar
                    <span className="button-arrow">→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};