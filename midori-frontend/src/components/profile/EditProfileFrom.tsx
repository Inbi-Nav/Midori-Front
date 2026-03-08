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
      const res = await updateProfile({
        name: form.name,
        email: form.email,
      }); 

      updateUser(res.data.data);
      onUpdate(res.data.data); 

      setMessage("Profile updated successfully");
      setTimeout(() => setMessage(""), 3000); 

    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Personal Information</h2>
      
      <div className="form-group">
        <label htmlFor="name">
          <FiUser size={16} />
          <span>Full Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          <FiMail size={16} />
          <span>Email Address</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
      </div>

      <button 
        type="submit" 
        className="profile-submit-btn"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};