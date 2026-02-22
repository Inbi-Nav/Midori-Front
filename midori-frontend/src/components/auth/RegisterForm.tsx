import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../../api/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterData) => {
    setServerError(null);

    try {
      const response = await registerUser(data);


      const token = response.data.token || response.data.access_token;
      const user = response.data.user;

      if (!token) {
        setServerError("Registro exitoso, pero no se recibió token.");
        return;
      }

      setAuth(token, user);

      navigate("/shop");
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        setServerError(firstError[0]);
      } else {
        setServerError(
          error.response?.data?.message || "Error al registrarse"
        );
      }
    }
  };

  return (
    <form className="auth-form register" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear cuenta en Midori</h2>

      <input
        type="text"
        placeholder="Nombre completo"
        {...register("name")}
      />
      <p className="error">{errors.name?.message}</p>

      <input
        type="email"
        placeholder="Correo electrónico"
        {...register("email")}
      />
      <p className="error">{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password")}
      />
      <p className="error">{errors.password?.message}</p>

      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("password_confirmation")}
      />
      <p className="error">{errors.password_confirmation?.message}</p>

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" className="btn-primary-full">
        Registrarme
      </button>

      <div className="auth-links">
        <span>¿Ya tienes cuenta?</span>
        <a href="/auth/login">Inicia sesión</a>
      </div>
    </form>
  );
};