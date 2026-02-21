import { Link } from "react-router-dom";
import { requestProvider } from "../../api/client.service";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";

export const TopbarShop = () => {
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleProviderRequest = async () => {
    try {
      setLoading(true);
      await requestProvider();
      alert("Solicitud enviada al administrador.");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Error enviando solicitud."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shop-topbar">
      <div className="logo">Midori</div>

      <div className="topbar-actions">
        {role === "client" && (
          <button
            className="btn-outline-dark"
            onClick={handleProviderRequest}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Provider Request"}
          </button>
        )}

        <Link to="/cart">Cesta</Link>
        <Link to="/orders">Mis pedidos</Link>
        <Link to="/profile">Perfil</Link>
      </div>
    </div>
  );
};