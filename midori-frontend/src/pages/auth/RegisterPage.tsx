import { RegisterForm } from "../../components/auth/RegisterForm";
import { Header } from "../../components/layout/Header";
import { Link } from "react-router-dom";
import { Footer } from "../../components/layout/Footer";
import "../../styles/auth.css";

export const RegisterPage = () => {
  return (
    <>
        <Link to="/" className="logo-container">
         <div className="auth-top-decoration">
        <div className="auth-logo-mini">
          <span className="auth-logo-initial">緑</span>
          <div className="auth-logo-glow"></div>
        </div>
        <span className="auth-logo-text">Midori</span>
      </div>
      </Link>
      <div className="auth-container" style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="auth-left" style={{ flex: "none", width: "100%", background: "transparent" }}>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
};