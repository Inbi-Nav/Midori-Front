import "../../styles/shop.css";

interface Props {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}

export const ShopLayout = ({ sidebar, topbar, children }: Props) => {
  return (
    <div className="shop-container">
      <aside className="shop-sidebar">{sidebar}</aside>

      <div className="shop-main">
        {topbar}
        <div className="shop-content">{children}</div>
      </div>
    </div>
  );
};