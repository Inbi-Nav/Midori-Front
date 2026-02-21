import { AuthLayout } from "../../components/auth/AuthLayout";
import { ClientLoginForm } from "../../components/auth/ClientLoginForm";
import { AdminLoginForm } from "../../components/auth/AdminLoginForm";

export const AuthPage = () => {
  return (
    <AuthLayout
      left={<ClientLoginForm />}
      right={<AdminLoginForm />}
    />
  );
};