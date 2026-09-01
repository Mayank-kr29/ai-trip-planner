import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Target } from 'lucide-react';
import { createTrip } from '../services/api';

const PlanTrip = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const indiaLocations = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati", "Amaravati"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
    "Assam": ["Guwahati", "Kaziranga", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Bodh Gaya"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
    "Goa": ["North Goa", "South Goa", "Panaji"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Kutch"],
    "Haryana": ["Gurugram", "Chandigarh", "Faridabad"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Dalhousie"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hampi"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Munnar", "Alleppey"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Manipur": ["Imphal", "Churachandpur"],
    "Meghalaya": ["Shillong", "Cherrapunji", "Dawki"],
    "Mizoram": ["Aizawl", "Lunglei"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Puri", "Cuttack"],
    "Punjab": ["Amritsar", "Chandigarh", "Ludhiana"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
    "Sikkim": ["Gangtok", "Pelling", "Lachung"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Ooty"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Tripura": ["Agartala", "Udaipur"],
    "Uttar Pradesh": ["Varanasi", "Agra", "Lucknow", "Mathura"],
    "Uttarakhand": ["Dehradun", "Rishikesh", "Nainital", "Mussoorie"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"]
  };

  const location = useLocation();
  const editTrip = location.state?.editTrip;

  const [formData, setFormData] = useState({
    state: editTrip?.state || '',
    city: editTrip?.city || '',
    startDate: editTrip?.startDate || '',
    endDate: editTrip?.endDate || '',
    budget: editTrip?.budget || '',
    travelers: editTrip?.travelers || 2,
    tripType: editTrip?.tripType || 'leisure'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData({ ...formData, state: value, city: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await createTrip(formData);
      setLoading(false);
      navigate('/results', { state: { plan: response.data, editTripId: editTrip?._id } });
    } catch (error) {
      console.error('API Error:', error);
      alert('Something went wrong bringing up your AI plan.');
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div className="glass-panel animate-fade-in-up" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '10px', fontSize: '2rem' }}>Tell us your dream</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Our AI will craft the perfect itinerary just for you.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Select State (India)</label>
              <div style={{ position: 'relative' }}>
                <MapPin style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <select 
                  name="state"
                  className="input-field" 
                  style={{ width: '100%', paddingLeft: '45px', appearance: 'none' }} 
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a state</option>
                  {Object.keys(indiaLocations).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Select City</label>
              <div style={{ position: 'relative' }}>
                <MapPin style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <select 
                  name="city"
                  className="input-field" 
                  style={{ width: '100%', paddingLeft: '45px', appearance: 'none' }} 
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={!formData.state}
                >
                  <option value="" disabled>Select a city</option>
                  {formData.state && indiaLocations[formData.state].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label className="input-label">Start Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <input type="date" name="startDate" className="input-field" style={{ width: '100%', paddingLeft: '45px' }} required onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">End Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <input type="date" name="endDate" className="input-field" style={{ width: '100%', paddingLeft: '45px' }} required onChange={handleChange} min={formData.startDate || new Date().toISOString().split('T')[0]} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label className="input-label">Total Trip Budget (₹)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <input 
                  type="number" 
                  name="budget" 
                  className="input-field" 
                  style={{ width: '100%', paddingLeft: '45px' }} 
                  value={formData.budget} 
                  onChange={handleChange} 
                  min="1000"
                  step="500"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Number of Travelers</label>
              <div style={{ position: 'relative' }}>
                <Users style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
                <input type="number" name="travelers" min="1" max="20" className="input-field" style={{ width: '100%', paddingLeft: '45px' }} value={formData.travelers} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Trip Style</label>
            <div style={{ position: 'relative' }}>
              <Target style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} size={20} />
              <select name="tripType" className="input-field" style={{ width: '100%', paddingLeft: '45px', appearance: 'none' }} value={formData.tripType} onChange={handleChange}>
                <option value="leisure">Leisure & Relax</option>
                <option value="adventure">Action & Adventure</option>
                <option value="cultural">Culture & History</option>
                <option value="food">Food & Culinary</option>
                <option value="nature">Nature & Outdoors</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '16px' }} disabled={loading}>
            {loading ? 'Generating Magic...' : 'Plan My Trip'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanTrip;
