import { useState } from "react";
import { updateProfile } from "../../api/user.service";
import { useAuthStore } from "../../store/auth.store";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export const EditProfileForm = ({ user, onUpdate }: any) => {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthStore();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await updateProfile(form);
      updateUser(res.data.user);
      onUpdate(res.data.user);
      setMessage("Perfil actualizado correctamente");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Información Personal</h2>
      
      <div className="form-group">
        <label htmlFor="name">
          <FiUser size={16} />
          <span>Nombre completo</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          <FiMail size={16} />
          <span>Correo electrónico</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </div>

      <button 
        type="submit" 
        className="profile-submit-btn"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};