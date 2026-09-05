import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrips, deleteTrip } from '../services/api';
import { Map, Calendar, Clock, Edit2, Trash2 } from 'lucide-react';

const History = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getAllTrips();
        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch your saved trip history.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleTripClick = (trip) => {
    navigate('/results', { state: { plan: trip, fromHistory: true } });
  };

  const handleEditTrip = (trip) => {
    navigate('/plan', { state: { editTrip: trip } });
  };

  const handleDeleteTrip = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteTrip(id);
        setTrips(trips.filter(t => t._id !== id));
      } catch (err) {
        alert("Failed to delete trip.");
      }
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', marginTop: '60px' }}>
      <div className="animate-fade-in-up">
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center', color: 'var(--text-pure)' }}>
          Your Trip <span style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>History</span>
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem' }}>
          Revisit all the incredible journeys you’ve planned with us!
        </p>

        {loading && <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading your history...</div>}
        {error && <div style={{ textAlign: 'center', color: 'var(--text-offwhite)' }}>{error}</div>}

        {!loading && !error && trips.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            You haven't saved any trips yet!
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {trips.map((trip) => (
            <div 
              key={trip._id} 
              className="glass-panel" 
              style={{ padding: '25px', cursor: 'pointer', transition: 'transform 0.3s, border-color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              onClick={() => handleTripClick(trip)}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'var(--text-pure)' }}>
                <Map size={20} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--text-pure)' }} />
                {trip.city}, {trip.state}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={18} color="var(--text-light)" />
                  <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} color="var(--text-light)" />
                  <span>{trip.travelers} Travelers</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>Budget: ₹{trip.budget}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditTrip(trip); }} 
                    style={{ background: 'var(--pill-bg)', color: 'var(--text-pure)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: '600', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--pill-bg)'}
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteTrip(trip._id); }} 
                    style={{ background: 'var(--pill-bg)', color: 'var(--text-dim)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: '600', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'; e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--pill-bg)'; e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
