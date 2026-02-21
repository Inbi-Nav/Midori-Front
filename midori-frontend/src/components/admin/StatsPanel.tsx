import { useEffect, useState } from "react";
import { getStats } from "../../api/admin.service";

export const StatsPanel = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;

  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Usuarios</h3>
        <p>{stats.total_users}</p>
      </div>

      <div className="stat-card">
        <h3>Productos</h3>
        <p>{stats.total_products}</p>
      </div>

      <div className="stat-card">
        <h3>Pedidos</h3>
        <p>{stats.total_orders}</p>
      </div>

      <div className="stat-card">
        <h3>Ingresos</h3>
        <p>${stats.total_revenue}</p>
      </div>
    </div>
  );
};