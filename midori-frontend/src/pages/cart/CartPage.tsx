import { useCartStore } from "../../store/cart.store";
import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { ShopLayout } from "../../components/shop/ShopLayout";
import { SidebarIcons } from "../../components/shop/SidebarIcons";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import "../../styles/cart.css";

export const CartPage = () => {
  const { items } = useCartStore();

  return (
    <>
      <ShopLayout
            sidebar={<SidebarIcons onProviderRequest={() => {}} />}
            topbar={null}
          >
      <div className="cart-page">
        <div className="cart-header">
          <h1>my cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag size={60} />
            </div>
            <p>Your cart is empty</p>
            <Link to="/shop" className="btn-shop">
              Explore products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </div>
    </ShopLayout>
    </>
  );
};