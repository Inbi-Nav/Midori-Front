import { useEffect, useState } from "react";
import { getStats } from "../../api/admin.service";
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";

export const StatsPanel = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Users",
      value: stats.total_users,
      icon: FiUsers,
      color: "var(--accent-mint)"
    },
    {
      title: "Products",
      value: stats.total_products,
      icon: FiPackage,
      color: "var(--accent-lavender)"
    },
    {
      title: "Orders",
      value: stats.total_orders,
      icon: FiShoppingBag,
      color: "var(--accent-pink)"
    },
    {
      title: "Revenue",
      value: `€${stats.total_revenue}`,
      icon: FiDollarSign,
      color: "var(--success)",
      className: "revenue"
    }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`stat-card ${stat.className || ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>{stat.title}</h3>
              <Icon size={24} color={stat.color} />
            </div>
            <p>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};