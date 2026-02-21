import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>© {new Date().getFullYear()} Midori. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};