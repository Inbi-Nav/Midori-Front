import { useEffect, useState } from "react";
import { getUsers } from "../../api/admin.service";

export const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'status-badge processing';
      case 'provider': return 'status-badge shipped';
      default: return 'status-badge pending';
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={getRoleBadgeClass(user.role)}>
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};