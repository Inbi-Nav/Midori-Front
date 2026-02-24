import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";
import { useAuthStore } from "../../store/auth.store";
import { FiHome, FiLayers, FiPackage, FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import { toast } from 'react-hot-toast';

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
      <div className="sidebar-logo">M</div>
      
      <div className="sidebar-top">
        <Link to="/shop" className="sidebar-icon" data-tooltip="Home">
          <FiHome size={22} />
        </Link>
        <button 
          onClick={onProviderRequest} 
          className="sidebar-icon" 
          data-tooltip="Provider Request"
        >
          <FiLayers size={22} />
        </button>
        <Link to="/profile" className="sidebar-icon" data-tooltip="Profile">
          <FiUser size={22} />
        </Link>
        <Link to="/orders" className="sidebar-icon" data-tooltip="My Orders">
          <FiPackage size={22} />
        </Link>
      </div>

      <div className="sidebar-bottom">
        <Link to="/cart" className="sidebar-icon" data-tooltip="Cart">
          <FiShoppingCart size={22} />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
        <button onClick={handleLogout} className="sidebar-icon" data-tooltip="Logout">
          <FiLogOut size={22} />
        </button>
      </div>
    </>
  );
};