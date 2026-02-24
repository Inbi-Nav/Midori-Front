import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { HeroSection } from "../../components/home/HeroSection";
import { Particles } from "../../components/home/Particles";
import { CategoryCards } from "../../components/home/CategoryCards";
import { motion } from "framer-motion";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <Particles />
      <Header />
      <HeroSection />
      <CategoryCards />
      <Footer />
    </>
  );
};