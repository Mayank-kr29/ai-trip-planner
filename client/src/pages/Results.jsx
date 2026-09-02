import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { MapPin, Sun, Moon, Coffee, Anchor, Utensils } from 'lucide-react';
import { saveTrip, updateTrip } from '../services/api';

const Results = () => {
  const location = useLocation();
  const tripData = location.state?.plan;
  const fromHistory = location.state?.fromHistory;
  const editTripId = location.state?.editTripId;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!tripData) return <Navigate to="/plan" />;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editTripId) {
        await updateTrip(editTripId, tripData);
      } else {
        await saveTrip(tripData);
      }
      setIsSaved(true);
    } catch (error) {
      console.error(error);
      alert('Failed to save itinerary.');
    } finally {
      setIsSaving(false);
    }
  };

  const hotels = tripData.hotels || [];
  const itinerary = tripData.itinerary || [];
  const foods = tripData.foods || [];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="animate-fade-in-up">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-pure)' }}>Your Trip to <span style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tripData.city}, {tripData.state}</span></h1>
        <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '0.95rem' }}>
          <span>{tripData.startDate} to {tripData.endDate}</span> •
          <span>{tripData.travelers} Travelers</span> •
          <span style={{ textTransform: 'capitalize' }}>₹{tripData.budget} Total Budget</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px' }}>
          {/* Left Column - Hotels */}
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-pure)' }}>
              <Anchor size={22} color="var(--accent-gold)" /> Recommended Hotels
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {hotels.map((hotel, i) => (
                <div key={i} className="glass-panel" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--text-pure)' }}>{hotel.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>⭐ {hotel.rating}</span>
                    <span style={{ color: 'var(--text-light)' }}>{hotel.price}</span>
                  </div>
                  <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', padding: '8px', textAlign: 'center' }}>View Deal</a>
                </div>
              ))}
              {hotels.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hotels found.</p>}
            </div>

            { foods.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-pure)' }}>
                  <Utensils size={22} color="var(--accent-gold)" /> Famous Local Food
                </h2>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-light)', lineHeight: '1.8' }}>
                    {foods.map((food, i) => (
                      <li key={i}>{food}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Itinerary */}
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-pure)' }}>
              <MapPin size={22} color="var(--accent-gold)" /> Day-by-day Itinerary
            </h2>

            <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px' }}>
              {itinerary.map((day, ix) => (
                <div key={ix} style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px' }}>
                    <h3 style={{ color: 'var(--text-pure)', fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>
                      Day {day.day}: {day.title}
                    </h3>
                    {day.expense && (
                      <span className="badge-pill">
                        Est. Expense: {day.expense}
                      </span>
                    )}
                  </div>
                  
                  {day.morning && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '26px' }}>
                      <div style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--accent-gold)', padding: '12px', borderRadius: '50%', height: 'fit-content', border: '1px solid rgba(212, 175, 55, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sun size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '4px', color: 'var(--text-pure)' }}>Morning - {day.morning.activity}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{day.morning.description}</p>
                      </div>
                    </div>
                  )}

                  {day.afternoon && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '26px' }}>
                      <div style={{ background: 'rgba(223, 230, 233, 0.08)', color: 'var(--text-light)', padding: '12px', borderRadius: '50%', height: 'fit-content', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Coffee size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '4px', color: 'var(--text-pure)' }}>Afternoon - {day.afternoon.activity}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{day.afternoon.description}</p>
                      </div>
                    </div>
                  )}

                  {day.evening && (
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ background: 'rgba(34, 40, 41, 0.8)', color: 'var(--text-dim)', padding: '12px', borderRadius: '50%', height: 'fit-content', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Moon size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '4px', color: 'var(--text-pure)' }}>Evening - {day.evening.activity}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{day.evening.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {itinerary.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No itinerary available right now.</p>}
            </div>
            
            {!fromHistory && (
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px' }}
                onClick={handleSave}
                disabled={isSaving || isSaved}
              >
                {isSaving ? (editTripId ? 'Updating...' : 'Saving...') : isSaved ? (editTripId ? 'Updated!' : 'Saved!') : (editTripId ? 'Update Itinerary' : 'Save Itinerary')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
