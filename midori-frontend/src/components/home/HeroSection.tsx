import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>Midori</h1>
        <p>
          Diseño Midori
        </p>

        <div className="hero-buttons">
          <button className="btn-primary-large">
            Explorar colección
          </button>
          <button className="btn-outline-dark">
            Conocer más
          </button>
        </div>
      </div>
    </section>
  );
};