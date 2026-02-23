import { RegisterForm } from "../../components/auth/RegisterForm";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import "../../styles/auth.css";

export const RegisterPage = () => {
  return (
    <>
      <Header />
      <div className="auth-container" style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="auth-left" style={{ flex: "none", width: "100%", background: "transparent" }}>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
};