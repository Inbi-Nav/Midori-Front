import { Link } from "react-router-dom";
import "../../styles/Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo-container">
          <div className="logo-circle-small">
            <span className="logo-initial-small">緑</span>
            <div className="glow-effect-small"></div>
          </div>
        </Link>

        <div className="auth-buttons">
          <Link to="/auth/login" className="btn-outline">
            Login
          </Link>
          <Link to="/auth/register" className="btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};