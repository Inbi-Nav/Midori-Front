import { RegisterForm } from "../../components/auth/RegisterForm";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

export const RegisterPage = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "80px 0", display: "flex", justifyContent: "center" }}>
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};