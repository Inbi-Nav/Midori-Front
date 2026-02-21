import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../api/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export const ClientLoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data);

      const token = response.data.token;
      const user = response.data.user;

      if (user.role !== "client") {
        setServerError("Este acceso es solo para clientes.");
        return;
      }

      setAuth(token, user);
      navigate("/shop");
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Bienvenido a Midori</h2>

      <input type="email" placeholder="Email" {...register("email")} />
      <p className="error">{errors.email?.message}</p>

      <input type="password" placeholder="Contraseña" {...register("password")} />
      <p className="error">{errors.password?.message}</p>

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" className="btn-primary-full">
        Iniciar sesión
      </button>

      <div className="auth-links">
        <span>¿No tienes cuenta?</span>
        <a href="/auth/register">Regístrate</a>
      </div>

      <div className="auth-links">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
    </form>
  );
};