import { Link } from "react-router-dom";
import "../../styles/Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <span className="logo-initial">M</span>
            <span className="logo-text">idori</span>
          </div>

          <Link to="/shop" className="footer-explore">
            Explorar
          </Link>
        </div>

        <div className="footer-divider">
          <span className="divider-icon">✧</span>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Midori. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};