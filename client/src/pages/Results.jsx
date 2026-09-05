import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { MapPin, Sun, Moon, Coffee, Anchor, Utensils, Clock, Ticket, ExternalLink, Compass } from 'lucide-react';
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

  const renderItinerarySlot = (slotData, slotType, icon, iconBg, iconColor, typeLabel) => {
    if (!slotData) return null;

    // Gracefully determine place name and activity
    const place = slotData.placeName || slotData.place || (slotData.activity ? slotData.activity : `${typeLabel} Exploration in ${tripData.city}`);
    const activity = slotData.placeName && slotData.activity && slotData.placeName !== slotData.activity ? slotData.activity : null;
    const description = slotData.description;
    const time = slotData.time;
    const ticketPrice = slotData.ticketPrice;

    // Build Google Maps search link if not present
    const queryTerm = `${place} ${tripData.city || ''} ${tripData.state || ''}`.trim();
    const mapUrl = slotData.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryTerm)}`;

    return (
      <div className="itinerary-slot-card">
        <div 
          className="itinerary-slot-icon" 
          style={{ 
            background: iconBg, 
            color: iconColor, 
            border: `1px solid ${iconColor}40` 
          }}
        >
          {icon}
        </div>

        <div className="itinerary-slot-content">
          <div className="itinerary-slot-header">
            <span 
              className="itinerary-slot-type-pill" 
              style={{ 
                background: iconBg, 
                color: iconColor, 
                border: `1px solid ${iconColor}40` 
              }}
            >
              {typeLabel}
            </span>
            
            {time && (
              <span className="itinerary-meta-pill">
                <Clock size={13} color="var(--text-light)" /> {time}
              </span>
            )}
          </div>

          <div className="itinerary-place-title">
            <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <span>{place}</span>
          </div>

          {activity && (
            <div className="itinerary-activity-title">
              <Compass size={15} style={{ flexShrink: 0 }} />
              <span>{activity}</span>
            </div>
          )}

          {description && (
            <p className="itinerary-desc">{description}</p>
          )}

          <div className="itinerary-meta-bar">
            {ticketPrice && (
              <span className="itinerary-meta-pill">
                <Ticket size={14} color="var(--text-light)" /> {ticketPrice}
              </span>
            )}

            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-map-link"
              title={`View ${place} on Google Maps`}
            >
              <MapPin size={13} /> View on Map <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  };

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
              <Anchor size={22} color="var(--text-pure)" /> Recommended Hotels
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {hotels.map((hotel, i) => (
                <div key={i} className="glass-panel" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'var(--text-pure)' }}>{hotel.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span style={{ color: 'var(--text-pure)', fontWeight: '600' }}>⭐ {hotel.rating}</span>
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
                  <Utensils size={22} color="var(--text-pure)" /> Famous Local Food
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
              <MapPin size={22} color="var(--text-pure)" /> Day-by-day Itinerary
            </h2>

            <div className="glass-panel" style={{ padding: '28px', marginBottom: '20px' }}>
              {itinerary.map((day, ix) => (
                <div key={ix} className="itinerary-day-block">
                  <div className="itinerary-day-header">
                    <h3 style={{ color: 'var(--text-pure)', fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>
                      Day {day.day}: {day.title}
                    </h3>
                    {day.expense && (
                      <span className="badge-pill">
                        Est. Expense: {day.expense}
                      </span>
                    )}
                  </div>
                  
                  {day.morning && renderItinerarySlot(
                    day.morning, 
                    'morning', 
                    <Sun size={20} />, 
                    'rgba(59, 130, 246, 0.12)', 
                    '#3B82F6', 
                    'Morning'
                  )}

                  {day.afternoon && renderItinerarySlot(
                    day.afternoon, 
                    'afternoon', 
                    <Coffee size={20} />, 
                    'rgba(245, 158, 11, 0.12)', 
                    '#D97706', 
                    'Afternoon'
                  )}

                  {day.evening && renderItinerarySlot(
                    day.evening, 
                    'evening', 
                    <Moon size={20} />, 
                    'rgba(139, 92, 246, 0.12)', 
                    '#7C3AED', 
                    'Evening'
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

