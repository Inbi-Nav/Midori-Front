import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../api/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/auth.css";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid Email").required("The email is required"),
  password: yup.string().required("The password is required"),
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
      const token = response.data.token || response.data.access_token;
      const user = response.data.user;

      if (!token || !user) {
        setServerError("Invalid response from the server.");
        return;
      }

      if (user.role === "admin") {
        setServerError("Login not permited");
        return;
      }

      setAuth(token, user);

      switch (user.role) {
        case "client":
          navigate("/shop");
          break;
        case "provider":
          navigate("/provider");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Error during login"
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Welcome to Midori</h2>

      <input 
        type="email" 
        placeholder="Email" 
        {...register("email")} 
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input 
        type="password" 
        placeholder="Password" 
        {...register("password")} 
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" className="btn-primary-full">
        Sign in
      </button>

      <div className="auth-links">
        <span>Don't have an account?</span>
        <a href="/auth/register">Register</a>
      </div>

    </form>
  );
};