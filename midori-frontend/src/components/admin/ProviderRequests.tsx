import { useEffect, useState } from "react";
import { getProviderRequests, approveProvider, declineProvider } from "../../api/admin.service";
import { FiCheck, FiX } from "react-icons/fi";

export const ProviderRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await getProviderRequests();
      setRequests(res.data);
    } catch (error) {
      console.error("Error loading requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      setProcessingId(id);
      await approveProvider(id);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error approving request");
      alert("Error approving provider");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (id: number) => {
    if (window.confirm("Are you sure you want to decline this request?")) {
      try {
        setProcessingId(id);
        await declineProvider(id);
        setRequests(prev => prev.filter(r => r.id !== id));
      } catch (error) {
        console.error("Error declining request");
        alert("Error declining provider request");
      } finally {
        setProcessingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="table-container">
        <h2 className="table-title">Provider Requests</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
          No pending requests
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Provider Requests</h2>
      <div className="requests-grid">
        {requests.map(req => (
          <div key={req.id} className="request-card">
            <div className="request-header">
              <h3 className="request-name">{req.name}</h3>
            </div>
            <div className="request-email">{req.email}</div>
            <div className="request-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button 
                className="btn-approve"
                onClick={() => handleApprove(req.id)}
                disabled={processingId === req.id}
                style={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  background: 'transparent',
                  border: '1px solid var(--success)',
                  borderRadius: '12px',
                  color: 'var(--success)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiCheck size={16} />
                {processingId === req.id ? 'Processing...' : 'Approve'}
              </button>
              
              <button 
                className="btn-decline"
                onClick={() => handleDecline(req.id)}
                disabled={processingId === req.id}
                style={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: '1px solid var(--error)',
                  borderRadius: '12px',
                  color: 'var(--error)',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiX size={16} />
                {processingId === req.id ? 'Processing...' : 'Decline'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};