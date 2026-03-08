import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";
import { useAuthStore } from "../../store/auth.store";
import { FiHome, FiLayers, FiPackage, FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
interface Props {
  onProviderRequest: () => void;
}
export const SidebarIcons = ({ onProviderRequest }: Props) => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { logout } = useAuthStore();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <div className="sidebar-logo">緑</div>
      <div className="sidebar-top">
        <Link to="/" className="sidebar-icon" data-tooltip="Home">
          <FiHome />
        </Link>
        <Link to="/shop" className="sidebar-icon" data-tooltip="Shop">
          <FiLayers />
        </Link>
        <button className="sidebar-icon" data-tooltip="Be Provider" onClick={onProviderRequest}>
          <FiPackage />
        </button>
        <Link to="/profile" className="sidebar-icon" data-tooltip="Profile">
          <FiUser />
        </Link>
      </div>
      <div className="sidebar-bottom">
        <Link to="/cart" className="sidebar-icon" data-tooltip="Cart">
          <FiShoppingCart />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        <button className="sidebar-icon" data-tooltip="Logout" onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </>
  );
};
