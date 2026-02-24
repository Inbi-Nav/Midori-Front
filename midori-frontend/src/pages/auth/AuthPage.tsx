import { AuthLayout } from "../../components/auth/AuthLayout";
import { ClientLoginForm } from "../../components/auth/ClientLoginForm";
import { AdminLoginForm } from "../../components/auth/AdminLoginForm";
import "../../styles/auth.css";

export const AuthPage = () => {
  return (
    <>
      <div className="auth-top-decoration">
        <div className="auth-logo-mini">
          <span className="auth-logo-initial">緑</span>
          <div className="auth-logo-glow"></div>
        </div>
        <span className="auth-logo-text">Midori</span>
      </div>

      <AuthLayout
        left={<ClientLoginForm />}
        right={<AdminLoginForm />}
      />
    </>
  );
};