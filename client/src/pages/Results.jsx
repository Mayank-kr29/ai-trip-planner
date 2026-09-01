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
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Your Trip to <span style={{ color: 'var(--primary)' }}>{tripData.city}, {tripData.state}</span></h1>
        <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', marginBottom: '40px' }}>
          <span>{tripData.startDate} to {tripData.endDate}</span> •
          <span>{tripData.travelers} Travelers</span> •
          <span style={{ textTransform: 'capitalize' }}>₹{tripData.budget} Total Budget</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px' }}>
          {/* Left Column - Hotels */}
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Anchor size={24} color="var(--accent)" /> Recommended Hotels
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {hotels.map((hotel, i) => (
                <div key={i} className="glass-panel" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{hotel.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span>⭐ {hotel.rating}</span>
                    <span>{hotel.price}</span>
                  </div>
                  <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', padding: '8px', textAlign: 'center' }}>View Deal</a>
                </div>
              ))}
              {hotels.length === 0 && <p>No hotels found.</p>}
            </div>

            { foods.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Utensils size={24} color="var(--warning)" /> Famous Local Food
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
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={24} color="var(--primary)" /> Day-by-day Itinerary
            </h2>

            <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px' }}>
              {itinerary.map((day, ix) => (
                <div key={ix} style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', marginBottom: '20px' }}>
                    <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', margin: 0 }}>
                      Day {day.day}: {day.title}
                    </h3>
                    {day.expense && (
                      <span style={{ background: 'rgba(255,101,132,0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
                        Est. Expense: {day.expense}
                      </span>
                    )}
                  </div>
                  
                  {day.morning && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                      <div style={{ background: 'rgba(255, 193, 7, 0.2)', color: 'var(--warning)', padding: '10px', borderRadius: '50%', height: 'fit-content' }}>
                        <Sun size={24} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Morning - {day.morning.activity}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{day.morning.description}</p>
                      </div>
                    </div>
                  )}

                  {day.afternoon && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                      <div style={{ background: 'rgba(108, 99, 255, 0.2)', color: 'var(--primary)', padding: '10px', borderRadius: '50%', height: 'fit-content' }}>
                        <Coffee size={24} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Afternoon - {day.afternoon.activity}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{day.afternoon.description}</p>
                      </div>
                    </div>
                  )}

                  {day.evening && (
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ background: 'rgba(26, 26, 46, 0.8)', color: 'var(--text-light)', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '50%', height: 'fit-content' }}>
                        <Moon size={24} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Evening - {day.evening.activity}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{day.evening.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {itinerary.length === 0 && <p>No itinerary available right now.</p>}
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
