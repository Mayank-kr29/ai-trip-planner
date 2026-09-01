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
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>
          Your Trip <span style={{ color: 'var(--primary)' }}>History</span>
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px' }}>
          Revisit all the incredible journeys you’ve planned with us!
        </p>

        {loading && <div style={{ textAlign: 'center' }}>Loading your history...</div>}
        {error && <div style={{ textAlign: 'center', color: 'var(--accent)' }}>{error}</div>}

        {!loading && !error && trips.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            You haven't saved any trips yet!
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {trips.map((trip) => (
            <div 
              key={trip._id} 
              className="glass-panel" 
              style={{ padding: '25px', cursor: 'pointer', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              onClick={() => handleTripClick(trip)}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-light)' }}>
                <Map size={20} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary)' }} />
                {trip.city}, {trip.state}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={18} />
                  <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} />
                  <span>{trip.travelers} Travelers</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>Budget: ₹{trip.budget}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={(e) => { e.stopPropagation(); handleEditTrip(trip); }} style={{ background: 'rgba(255, 193, 7, 0.2)', color: 'var(--warning)', padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteTrip(trip._id); }} style={{ background: 'rgba(255, 82, 82, 0.2)', color: '#FF5252', padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Trash2 size={14} /> Delete
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
