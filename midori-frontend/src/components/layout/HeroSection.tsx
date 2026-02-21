import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">Midori</div>

        <nav className="nav">
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <Link to="/about">Nosotros</Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/auth/login" className="btn-outline">
            Login
          </Link>
          <Link to="/auth/register" className="btn-primary">
            Registro
          </Link>
        </div>
      </div>
    </header>
  );
};