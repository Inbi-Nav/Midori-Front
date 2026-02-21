import { Link } from "react-router-dom";

export const TopbarShop = () => {
  return (
    <div className="shop-topbar">
      <div className="logo">Midori</div>

      <div className="topbar-actions">
        <button className="btn-outline-dark">Provider Request</button>
        <Link to="/cart">Cesta</Link>
        <Link to="/orders">Mis pedidos</Link>
        <Link to="/profile">Perfil</Link>
      </div>
    </div>
  );
};