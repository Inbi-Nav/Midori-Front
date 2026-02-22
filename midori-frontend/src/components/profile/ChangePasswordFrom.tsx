import { useState } from "react";
import { changePassword } from "../../api/user.service";

export const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await changePassword(form);
      setMessage(res.data.message);
      setError("");
      setForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Cambiar Contraseña</h2>

      <input
        type="password"
        name="current_password"
        placeholder="Contraseña actual"
        value={form.current_password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="new_password"
        placeholder="Nueva contraseña"
        value={form.new_password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="new_password_confirmation"
        placeholder="Confirmar nueva contraseña"
        value={form.new_password_confirmation}
        onChange={handleChange}
      />

      <button type="submit">Actualizar contraseña</button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};