import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiUser,
  FiPackage,
  FiLogOut,
  FiLayers
} from "react-icons/fi";

import { useCartStore } from "../../store/cart.store";
import { useAuthStore } from "../../store/auth.store";

interface Props {
  onProviderRequest: () => void;
}

export const MobileBottomNav = ({ onProviderRequest }: Props) => {

  const navigate = useNavigate();

  const { items } = useCartStore();
  const { logout } = useAuthStore();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="mobile-bottom-nav">

      <Link to="/shop" className="mobile-nav-icon">
        <FiHome size={22} />
      </Link>

      <Link
        onClick={onProviderRequest}
        className="mobile-nav-icon">
        <FiLayers size={22} />
      </Link>

      <Link
        to="/cart"
        className="mobile-nav-icon"
        style={{ position: "relative" }} >
        <FiShoppingCart size={22} />

        {cartItemCount > 0 && (
          <span className="cart-badge">
            {cartItemCount}
          </span>
        )}
      </Link>

      <Link to="/orders" className="mobile-nav-icon">
        <FiPackage size={22} />
      </Link>

      <Link to="/profile" className="mobile-nav-icon">
        <FiUser size={22} />
      </Link>

      <Link
        onClick={handleLogout}
        className="mobile-nav-icon">
        <FiLogOut size={22} />
      </Link>

    </div>
  );
};