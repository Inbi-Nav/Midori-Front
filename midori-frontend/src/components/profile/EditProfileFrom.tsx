import { useState } from "react";
import { updateProfile } from "../../api/user.service";
import { useAuthStore } from "../../store/auth.store";

export const EditProfileForm = ({ user, onUpdate }: any) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

const [message, setMessage] = useState("");
const { updateUser } = useAuthStore();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await updateProfile(form);
    updateUser(res.data.user);
    onUpdate(res.data.user);
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Datos Personales</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <button type="submit">Guardar cambios</button>

      {message && <p className="success">{message}</p>}
    </form>
  );
};