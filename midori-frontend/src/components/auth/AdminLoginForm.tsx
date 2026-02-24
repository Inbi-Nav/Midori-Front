import { useForm } from "react-hook-form";
import { login } from "../../api/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/auth.css";

export const AdminLoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      const token = response.data.token || response.data.access_token;
      const user = response.data.user;

      if (user.role !== "admin") {
        setError("You do not have administrator permissions.");
        return;
      }

      setAuth(token, user);
      navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error during login");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Administrator</h2>

      <input 
        type="email" 
        placeholder="Email" 
        {...register("email")} 
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        {...register("password")} 
      />

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn-dark-full">
        Admin Login
      </button>
    </form>
  );
};