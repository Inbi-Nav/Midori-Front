import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/admin.service";
import { FiTrash2 } from "react-icons/fi";

export const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'status-badge processing';
      case 'provider': return 'status-badge shipped';
      default: return 'status-badge pending';
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(id);

      await deleteUser(id);

      setUsers(prev => prev.filter(user => user.id !== id));

    } catch (error) {
      console.error("Error deleting user");
      alert("Error deleting user");
    } finally {
      setDeletingId(null);
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
            <th style={{ width: "80px" }}>Actions</th>
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

              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                >
                  <FiTrash2 size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};