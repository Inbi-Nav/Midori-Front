import "../../styles/shop-ghibli.css";
import { MobileBottomNav } from "./MobileBottomNav";

interface Props {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}
export const ShopLayout = ({ sidebar, topbar, children }: Props) => {
  return (
    <div className="shop-container">
      <aside className="shop-sidebar">{sidebar}</aside>
      <main className="shop-main">
        {topbar}
        <div className="shop-content">
          {children}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};