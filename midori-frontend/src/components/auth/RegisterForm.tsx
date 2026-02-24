import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../../api/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/auth.css";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup.object({
  name: yup.string().required("The name is required"),
  email: yup.string().email("Invalid Email").required("The email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("The password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
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
        setServerError("Registration successful, but no token was received.");
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
          error.response?.data?.message || "Error during registration"
        );
      }
    }
  };

  return (
    <form className="auth-form register" onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        {...register("name")}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

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

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("password_confirmation")}
      />
      {errors.password_confirmation && <p className="error">{errors.password_confirmation.message}</p>}

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" className="btn-primary-full">
        Register
      </button>

      <div className="auth-links">
        <span>Already have an account?</span>
        <a href="/auth/login">Sign in</a>
      </div>
    </form>
  );
};