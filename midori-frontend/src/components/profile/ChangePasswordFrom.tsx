import { useState } from "react";
import { changePassword } from "../../api/user.service";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (form.new_password !== form.new_password_confirmation) {
      setError("the new password and confirmation do not match");
      setLoading(false);
      return;
    }

    if (form.new_password.length < 6) {
      setError("The new password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await changePassword(form);
      setMessage("Password updated successfully");
      setForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Change Password</h2>

      <div className="form-group">
        <label htmlFor="current_password">
          <FiLock size={16} />
          <span>Current Password</span>
        </label>
        <div className="password-input-wrapper">
          <input
            id="current_password"
            type={showPasswords.current ? "text" : "password"}
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <button 
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('current')}
          >
            {showPasswords.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="new_password">
          <FiLock size={16} />
          <span>New Password</span>
        </label>
        <div className="password-input-wrapper">
          <input
            id="new_password"
            type={showPasswords.new ? "text" : "password"}
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <button 
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('new')}
          >
            {showPasswords.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="new_password_confirmation">
          <FiLock size={16} />
          <span>Confirm New Password</span>
        </label>
        <div className="password-input-wrapper">
          <input
            id="new_password_confirmation"
            type={showPasswords.confirm ? "text" : "password"}
            name="new_password_confirmation"
            value={form.new_password_confirmation}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <button 
            type="button"
            className="password-toggle"
            onClick={() => togglePassword('confirm')}
          >
            {showPasswords.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        className="profile-submit-btn"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};