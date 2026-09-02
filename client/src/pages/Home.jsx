import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const goaTrip = {
  city: "Goa", state: "Goa", startDate: "Soon", endDate: "4 Days Later", travelers: "2", budget: "moderate",
  hotels: [
    { name: "Taj Exotica Resort & Spa", rating: "4.8", price: "₹15,000/night", link: "https://www.tajhotels.com/" },
    { name: "W Goa", rating: "4.6", price: "₹12,000/night", link: "https://w-hotels.marriott.com/" }
  ],
  foods: ["Goan Fish Curry", "Prawn Balchão", "Bebinca", "Feni"],
  itinerary: [
    { day: 1, title: "Arrival & North Goa Beaches", expense: "₹2,000", morning: { activity: "Baga Beach", description: "Relax at the famous Baga beach." }, afternoon: { activity: "Fort Aguada", description: "Explore the historic Portuguese fort." }, evening: { activity: "Tito's Lane", description: "Experience the vibrant nightlife." } },
    { day: 2, title: "South Goa Serenity", expense: "₹2,500", morning: { activity: "Palolem Beach", description: "Enjoy the calm waters of South Goa." }, afternoon: { activity: "Dudhsagar Waterfalls", description: "A scenic trip to the majestic falls." }, evening: { activity: "Dinner by the sea", description: "Seafood dinner at a local shack." } },
    { day: 3, title: "Culture & Heritage", expense: "₹1,500", morning: { activity: "Basilica of Bom Jesus", description: "Visit the UNESCO World Heritage site." }, afternoon: { activity: "Fontainhas Walk", description: "Explore the Latin Quarter of Panjim." }, evening: { activity: "Mandovi River Cruise", description: "Sunset cruise with music and dance." } },
    { day: 4, title: "Shopping & Departure", expense: "₹3,000", morning: { activity: "Anjuna Flea Market", description: "Shop for souvenirs and hippy clothing." }, afternoon: { activity: "Cafe Hopping", description: "Relax at aesthetic cafes before leaving." }, evening: { activity: "Departure", description: "Head to the airport." } }
  ]
};

const jaipurTrip = {
  city: "Jaipur", state: "Rajasthan", startDate: "Soon", endDate: "3 Days Later", travelers: "2", budget: "moderate",
  hotels: [
    { name: "Rambagh Palace", rating: "4.9", price: "₹30,000/night", link: "https://www.tajhotels.com/" },
    { name: "Umaid Bhawan Heritage House", rating: "4.5", price: "₹5,000/night", link: "https://www.umaidbhawan.com/" }
  ],
  foods: ["Dal Baati Churma", "Laal Maas", "Ghevar", "Pyaz Kachori"],
  itinerary: [
    { day: 1, title: "Pink City Wonders", expense: "₹1,500", morning: { activity: "Hawa Mahal", description: "Marvel at the Palace of Winds." }, afternoon: { activity: "City Palace", description: "Explore the royal residence." }, evening: { activity: "Chokhi Dhani", description: "Experience traditional Rajasthani culture and village life." } },
    { day: 2, title: "Forts and Views", expense: "₹2,000", morning: { activity: "Amer Fort", description: "Visit the grand hill fort." }, afternoon: { activity: "Nahargarh Fort", description: "Enjoy panoramic views of the city." }, evening: { activity: "Jal Mahal", description: "See the water palace beautifully illuminated at night." } },
    { day: 3, title: "Shopping & Departure", expense: "₹2,500", morning: { activity: "Johari Bazaar", description: "Shop for gems and jewelry." }, afternoon: { activity: "Albert Hall Museum", description: "Visit the state museum of Rajasthan." }, evening: { activity: "Departure", description: "Head to the airport." } }
  ]
};

const keralaTrip = {
  city: "Munnar & Alleppey", state: "Kerala", startDate: "Soon", endDate: "5 Days Later", travelers: "2", budget: "luxury",
  hotels: [
    { name: "Kumarakom Lake Resort", rating: "4.8", price: "₹20,000/night", link: "https://www.kumarakomlakeresort.in/" },
    { name: "Spice Tree Munnar", rating: "4.7", price: "₹10,000/night", link: "https://spicetreemunnar.com/" }
  ],
  foods: ["Appam with Stew", "Kerala Fish Curry", "Puttu and Kadala Curry", "Payasam"],
  itinerary: [
    { day: 1, title: "Arrival in Kochi", expense: "₹1,000", morning: { activity: "Fort Kochi", description: "Visit the Chinese Fishing Nets." }, afternoon: { activity: "Mattancherry Palace", description: "Explore the Dutch Palace." }, evening: { activity: "Kathakali Performance", description: "Watch a traditional dance show." } },
    { day: 2, title: "Journey to Munnar", expense: "₹1,500", morning: { activity: "Travel to Munnar", description: "Scenic drive through the tea hills." }, afternoon: { activity: "Tea Museum", description: "Learn about tea processing." }, evening: { activity: "Local Market", description: "Stroll through Munnar town." } },
    { day: 3, title: "Munnar Sightseeing", expense: "₹1,200", morning: { activity: "Eravikulam National Park", description: "Spot the endangered Nilgiri Tahr." }, afternoon: { activity: "Mattupetty Dam", description: "Enjoy boating in the reservoir." }, evening: { activity: "Echo Point", description: "Experience the natural echo phenomenon." } },
    { day: 4, title: "Alleppey Houseboat", expense: "₹5,000", morning: { activity: "Travel to Alleppey", description: "Drive to the backwaters." }, afternoon: { activity: "Board Houseboat", description: "Cruise through the serene backwaters." }, evening: { activity: "Houseboat Stay", description: "Overnight stay on the traditional boat." } },
    { day: 5, title: "Departure", expense: "₹1,000", morning: { activity: "Morning Cruise", description: "Final views of the backwaters." }, afternoon: { activity: "Travel to Kochi", description: "Drive back to Kochi." }, evening: { activity: "Departure", description: "Fly out of Kochi." } }
  ]
};

const Home = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
      <div className="animate-fade-in-up">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', background: 'linear-gradient(135deg, #ffffff 0%, #dfe6e9 50%, var(--accent-gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your Dream Journey, <br />Planned in Seconds
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px' }}>
          Harness the power of AI to build a complete itinerary, discover hidden gems, and find the perfect hotels tailored to your budget.
        </p>
        
        <Link to="/plan" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.2rem', animation: 'pulse-glow 2s infinite' }}>
          <Sparkles size={20} />
          Start Planning Now
        </Link>
      </div>

      <div style={{ marginTop: '100px', textAlign: 'left', animation: 'fadeInUp 1s ease-out', paddingBottom: '60px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
          Explore Popular Tours
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <Link to="/results" state={{ plan: goaTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/goa.png" alt="Goa Beach Getaway" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Goa Beach Getaway</h3>
                <span className="badge-pill">4 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Relax on pristine golden beaches, explore vibrant nightlife, and experience the coastal charm.</p>
            </div>
          </Link>

          <Link to="/results" state={{ plan: jaipurTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/jaipur.png" alt="Royal Jaipur Tour" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Royal Jaipur Tour</h3>
                <span className="badge-pill">3 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Discover the majesty of the Pink City, grand palaces, rich culture, and stunning sunsets.</p>
            </div>
          </Link>

          <Link to="/results" state={{ plan: keralaTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/kerala.png" alt="Kerala Backwaters Retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Kerala Backwaters</h3>
                <span className="badge-pill">5 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sail through tranquil backwaters on a traditional houseboat amidst lush greenery.</p>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Home;
