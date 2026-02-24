import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const orbs = heroRef.current.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
          const speed = 0.5 + (index * 0.1);
          (orb as HTMLElement).style.transform = `scale(${1 + scrolled * 0.001 * speed}) translateY(${scrolled * 0.1 * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-grid"></div>
      
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      
      <div className="container hero-content">
        
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Midori
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}>
          Refine your space, discover new treasures
        </motion.p>

        <motion.div 
          className="hero-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button className="btn-primary-large" onClick={() => {
            const section = document.getElementById("categories"); section?.scrollIntoView({ behavior: "smooth" });
          }}>
            Explore our collections
            
          </button>
          <button className="btn-outline-dark">
            Get to know us
          </button>
        </motion.div>
      </div>

    </section>
  );
};