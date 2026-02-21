import { useEffect, useState } from "react";
import { getProviderRequests, approveProvider } from "../../api/admin.service";

export const ProviderRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    getProviderRequests().then(res => setRequests(res.data));
  }, []);

  const handleApprove = async (id: number) => {
    await approveProvider(id);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      <h2>Solicitudes de Proveedor</h2>
      {requests.map(req => (
        <div key={req.id}>
          {req.name}
          <button onClick={() => handleApprove(req.id)}>
            Aprobar
          </button>
        </div>
      ))}
    </div>
  );
};