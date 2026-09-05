import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Compass } from 'lucide-react';

const goaTrip = {
  city: "Goa", state: "Goa", startDate: "2026-10-12", endDate: "2026-10-16", travelers: "2", budget: "16000", tripType: "leisure",
  hotels: [
    { name: "Taj Exotica Resort & Spa", rating: "4.8", price: "₹15,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Goa" },
    { name: "W Goa", rating: "4.6", price: "₹12,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Goa" }
  ],
  foods: ["Goan Fish Curry", "Prawn Balchão", "Bebinca", "Feni & Sol Kadhi"],
  itinerary: [
    { 
      day: 1, title: "North Goa Coastline & Portuguese Forts", expense: "₹3,500", 
      morning: { placeName: "Aguada Fort & 1864 Lighthouse", activity: "Explore 17th-Century Bastion", description: "Panoramic Arabian Sea views and ancient coastal ramparts.", time: "09:00 AM - 11:30 AM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Fort+Aguada+Goa" }, 
      afternoon: { placeName: "Calangute & Baga Beach", activity: "Water Sports & Shacks", description: "Parasailing and beachside Goan seafood delicacies.", time: "12:30 PM - 04:30 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Baga+Beach+Goa" }, 
      evening: { placeName: "Anjuna Beach Cliffs", activity: "Sunset Lounge & Flea Market", description: "Watch twilight over the rocky ocean cliffs with acoustic beach tunes.", time: "05:00 PM - 08:30 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Anjuna+Beach+Goa" } 
    },
    { 
      day: 2, title: "Colonial Old Goa & Latin Quarters", expense: "₹3,000", 
      morning: { placeName: "Basilica of Bom Jesus & Se Cathedral", activity: "Baroque Architecture Tour", description: "Marvel at the 1605 UNESCO World Heritage Jesuit church.", time: "08:30 AM - 11:30 AM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Basilica+of+Bom+Jesus+Goa" }, 
      afternoon: { placeName: "Fontainhas Latin Quarter", activity: "Portuguese Heritage Walk", description: "Stroll along pastel yellow villas and sample warm Bebinca.", time: "01:00 PM - 04:30 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Fontainhas+Panaji+Goa" }, 
      evening: { placeName: "Mandovi River Promenade", activity: "Sundown Boat Cruise", description: "Enjoy Goan folk dance and illuminated city riverfront views.", time: "05:30 PM - 08:00 PM", ticketPrice: "₹400", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mandovi+River+Cruise+Panaji" } 
    }
  ]
};

const jaipurTrip = {
  city: "Jaipur", state: "Rajasthan", startDate: "2026-11-05", endDate: "2026-11-08", travelers: "2", budget: "18000", tripType: "heritage",
  hotels: [
    { name: "Rambagh Palace", rating: "4.9", price: "₹25,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Jaipur" },
    { name: "Umaid Bhawan Heritage House", rating: "4.5", price: "₹5,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Jaipur" }
  ],
  foods: ["Dal Baati Churma", "Laal Maas", "Ghevar", "Pyaz Kachori"],
  itinerary: [
    { 
      day: 1, title: "Pink City Fortresses & Palaces", expense: "₹3,500", 
      morning: { placeName: "Amber Fort & Palace", activity: "Rajput Citadel & Sheesh Mahal", description: "Marvel at the royal hall of mirrors and Maota Lake.", time: "08:30 AM - 12:00 PM", ticketPrice: "₹100", mapUrl: "https://www.google.com/maps/search/?api=1&query=Amber+Fort+Jaipur" }, 
      afternoon: { placeName: "Jal Mahal & City Palace", activity: "Water Palace Tour", description: "Submerged palace views and royal courtyards.", time: "01:30 PM - 04:30 PM", ticketPrice: "₹200", mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace+Jaipur" }, 
      evening: { placeName: "Hawa Mahal & Johari Bazaar", activity: "Honeycomb Facade & Shopping", description: "Twilight photography and tasting authentic pyaz kachoris.", time: "05:00 PM - 08:00 PM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hawa+Mahal+Jaipur" } 
    }
  ]
};

const keralaTrip = {
  city: "Munnar", state: "Kerala", startDate: "2026-12-01", endDate: "2026-12-05", travelers: "2", budget: "20000", tripType: "nature",
  hotels: [
    { name: "Kumarakom Lake Resort", rating: "4.8", price: "₹18,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Munnar" },
    { name: "Spice Tree Munnar", rating: "4.7", price: "₹9,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Munnar" }
  ],
  foods: ["Appam with Stew", "Kerala Sadya", "Malabar Prawn Curry", "Banana Chips"],
  itinerary: [
    { 
      day: 1, title: "Emerald Tea Estates & Misty Mountain Peaks", expense: "₹3,200", 
      morning: { placeName: "Eravikulam National Park", activity: "Nilgiri Tahr Safari & Anamudi View", description: "Explore rolling mountain grasslands and spot wild mountain goats.", time: "08:00 AM - 11:30 AM", ticketPrice: "₹200", mapUrl: "https://www.google.com/maps/search/?api=1&query=Eravikulam+National+Park+Munnar" }, 
      afternoon: { placeName: "KDHP Tea Museum & Factory", activity: "Tea Manufacturing & Tasting", description: "Century-old tea plantation history and fresh tea tasting.", time: "01:00 PM - 04:00 PM", ticketPrice: "₹125", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tea+Museum+Munnar" }, 
      evening: { placeName: "Mattupetty Dam & Echo Point", activity: "Speed Boating & Mist Lake", description: "Reservoir boating amidst rolling tea hills.", time: "04:30 PM - 07:00 PM", ticketPrice: "₹500", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mattupetty+Dam+Munnar" } 
    }
  ]
};

const agraTrip = {
  city: "Agra", state: "Uttar Pradesh", startDate: "2026-11-15", endDate: "2026-11-17", travelers: "2", budget: "12000", tripType: "heritage",
  hotels: [
    { name: "The Oberoi Amarvilas", rating: "4.9", price: "₹35,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Agra" },
    { name: "ITC Mughal Resort", rating: "4.6", price: "₹8,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Agra" }
  ],
  foods: ["Agra Petha", "Bedmi Puri & Jalebi", "Mughlai Biryani"],
  itinerary: [
    { 
      day: 1, title: "Wonder of the World & Mughal Fortresses", expense: "₹2,800", 
      morning: { placeName: "Taj Mahal (East Gate)", activity: "Sunrise Marble Wonder", description: "Behold the ethereal monument of love in morning golden light.", time: "06:00 AM - 09:30 AM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Taj+Mahal+Agra" }, 
      afternoon: { placeName: "Agra Fort (UNESCO World Heritage)", activity: "Imperial Palace Tour", description: "Tour the red sandstone fortress and Jahangiri Mahal.", time: "01:30 PM - 04:30 PM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Agra+Fort" }, 
      evening: { placeName: "Mehtab Bagh", activity: "Moonlight Garden Sunset", description: "Sunset panorama of the Taj Mahal across the tranquil Yamuna river.", time: "05:00 PM - 07:30 PM", ticketPrice: "₹25", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mehtab+Bagh+Agra" } 
    }
  ]
};

const varanasiTrip = {
  city: "Varanasi", state: "Uttar Pradesh", startDate: "2026-10-20", endDate: "2026-10-23", travelers: "2", budget: "14000", tripType: "spiritual",
  hotels: [
    { name: "BrijRama Palace Heritage", rating: "4.8", price: "₹18,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Varanasi" },
    { name: "Ganges View Stay", rating: "4.4", price: "₹4,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Varanasi" }
  ],
  foods: ["Banarasi Paan", "Kachori Sabzi & Jalebi", "Malaiyo", "Tamatar Chaat"],
  itinerary: [
    { 
      day: 1, title: "Sacred Ganges Ghats & Grand Ganga Aarti", expense: "₹2,500", 
      morning: { placeName: "Dashashwamedh Ghat", activity: "Subah-e-Banaras Sunrise Boat Ride", description: "Dawn break over the holy river on a wooden boat.", time: "05:30 AM - 09:30 AM", ticketPrice: "₹300", mapUrl: "https://www.google.com/maps/search/?api=1&query=Dashashwamedh+Ghat+Varanasi" }, 
      afternoon: { placeName: "Kashi Vishwanath Corridor", activity: "Golden Temple Darshan", description: "Revered Jyotirlinga darshan and Banarasi silk weaving lanes.", time: "01:00 PM - 04:30 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kashi+Vishwanath+Temple+Varanasi" }, 
      evening: { placeName: "Dashashwamedh Ghat Ganga Aarti", activity: "Grand Brass Lamp Ceremony", description: "Priestly chant ritual with thousands of floating earthen diyas.", time: "06:00 PM - 08:30 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Ganga+Aarti+Dashashwamedh+Ghat+Varanasi" } 
    }
  ]
};

const kolkataTrip = {
  city: "Kolkata", state: "West Bengal", startDate: "2026-12-10", endDate: "2026-12-13", travelers: "2", budget: "15000", tripType: "culture",
  hotels: [
    { name: "The Oberoi Grand Kolkata", rating: "4.8", price: "₹14,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Kolkata" },
    { name: "The Lalit Great Eastern", rating: "4.5", price: "₹7,000/night", link: "https://www.google.com/travel/hotels?q=Hotels+in+Kolkata" }
  ],
  foods: ["Kolkata Biryani", "Macher Jhol", "Rasgulla & Sandesh", "Kathi Rolls"],
  itinerary: [
    { 
      day: 1, title: "Colonial Grandeur & Hooghly Riverfront", expense: "₹3,000", 
      morning: { placeName: "Victoria Memorial & Maidan", activity: "British Architecture Heritage Walk", description: "White marble palace and royal art galleries.", time: "09:00 AM - 12:00 PM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Victoria+Memorial+Kolkata" }, 
      afternoon: { placeName: "Indian Museum & Park Street", activity: "Ancient Artifacts & Street Food", description: "Egyptian mummies and iconic Park Street rolls.", time: "01:00 PM - 04:30 PM", ticketPrice: "₹50", mapUrl: "https://www.google.com/maps/search/?api=1&query=Indian+Museum+Kolkata" }, 
      evening: { placeName: "Princep Ghat & Vidyasagar Setu", activity: "Sunset River Boat Ride", description: "Palladian porch riverfront stroll and wooden boat ride.", time: "05:00 PM - 08:00 PM", ticketPrice: "Free", mapUrl: "https://www.google.com/maps/search/?api=1&query=Princep+Ghat+Kolkata" } 
    }
  ]
};

const Home = () => {
  return (
    <div className="container" style={{ padding: '20px 20px 60px' }}>
      
      {/* Hero Section with Ambient User Trips Collage Background */}
      <div className="hero-wrapper">
        <div className="hero-collage-bg" aria-hidden="true">
          <div className="collage-item" style={{ transform: 'rotate(-4deg) translateY(-10px)' }}>
            <img src="/images/taj.jpg" alt="Agra Taj Mahal" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Agra, UP</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(3deg) translateY(15px)' }}>
            <img src="/images/himalayas.jpg" alt="Manali Snow Peaks" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Manali, HP</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(-2deg) translateY(-20px)' }}>
            <img src="/images/goa.png" alt="Goa Beaches" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Baga, Goa</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(4deg) translateY(10px)' }}>
            <img src="/images/kerala.png" alt="Kerala Backwaters" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Alleppey, Kerala</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(2deg) translateY(5px)' }}>
            <img src="/images/jaipur.png" alt="Jaipur Palace" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Jaipur, Rajasthan</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(-3deg) translateY(-15px)' }}>
            <img src="/images/varanasi.jpg" alt="Varanasi Ganga Ghats" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Varanasi, UP</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(3deg) translateY(10px)' }}>
            <img src="/images/kolkata.jpg" alt="Kolkata Victoria Memorial" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Kolkata, WB</span>
          </div>
          <div className="collage-item" style={{ transform: 'rotate(-2deg) translateY(-5px)' }}>
            <img src="/images/taj.jpg" alt="Sunrise Wonder" />
            <span className="collage-tag"><MapPin size={11} color="#60A5FA" /> Taj Mahal, Agra</span>
          </div>
        </div>

        {/* Cinematic Scrim Overlay */}
        <div className="hero-scrim-overlay"></div>

        {/* Foreground Hero Content */}
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <Compass size={15} /> Over 10,000+ Journeys Planned Across India
          </div>
          
          <h1 style={{ fontSize: '3.6rem', marginBottom: '22px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.16 }}>
            Your Dream Journey, <br />Planned in Seconds
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '620px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Harness the power of AI to build a complete itinerary, discover hidden gems, and find the perfect hotels tailored to your budget.
          </p>
          
          <Link to="/plan" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
            <Sparkles size={18} color="#FFFFFF" />
            Start Planning Now
          </Link>
        </div>
      </div>

      {/* Popular Tours Grid */}
      <div style={{ marginTop: '80px', textAlign: 'left', animation: 'fadeInUp 1s ease-out', paddingBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
          Explore Popular Tours
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* Goa Card */}
          <Link to="/results" state={{ plan: goaTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/goa.png" alt="Goa Beach Getaway" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Goa Beach Getaway</h3>
                <span className="badge-pill">4 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Relax on pristine golden beaches, explore vibrant nightlife, and experience the coastal charm.</p>
            </div>
          </Link>

          {/* Jaipur Card */}
          <Link to="/results" state={{ plan: jaipurTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/jaipur.png" alt="Royal Jaipur Tour" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Royal Jaipur Tour</h3>
                <span className="badge-pill">3 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Discover the majesty of the Pink City, grand palaces, rich culture, and stunning sunsets.</p>
            </div>
          </Link>

          {/* Kerala Card */}
          <Link to="/results" state={{ plan: keralaTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/kerala.png" alt="Kerala Backwaters Retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Kerala Backwaters</h3>
                <span className="badge-pill">5 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sail through tranquil backwaters on a traditional houseboat amidst lush greenery.</p>
            </div>
          </Link>

          {/* Agra Taj Mahal Card */}
          <Link to="/results" state={{ plan: agraTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/taj.jpg" alt="Agra & Taj Mahal" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Agra & The Taj Mahal</h3>
                <span className="badge-pill">3 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Marvel at the world wonder at sunrise, imperial Mughal red fortresses, and heritage gardens.</p>
            </div>
          </Link>

          {/* Varanasi Card */}
          <Link to="/results" state={{ plan: varanasiTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/varanasi.jpg" alt="Spiritual Varanasi" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Sacred Varanasi Ghats</h3>
                <span className="badge-pill">4 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Experience dawn boat rides over the Ganges, grand evening aarti, and ancient temple corridors.</p>
            </div>
          </Link>

          {/* Kolkata Card */}
          <Link to="/results" state={{ plan: kolkataTrip }} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', padding: '0' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            <div style={{ height: '210px', width: '100%', overflow: 'hidden' }}>
              <img src="/images/kolkata.jpg" alt="Kolkata Heritage" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-pure)' }}>Kolkata Cultural Trail</h3>
                <span className="badge-pill">3 Days</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Explore the grandeur of Victoria Memorial, historic riverfront ghats, and famous street gastronomy.</p>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Home;
