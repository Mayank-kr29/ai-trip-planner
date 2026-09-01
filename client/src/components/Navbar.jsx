import { Link, useLocation } from 'react-router-dom';
import { Plane, Compass, Map } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <Plane className="logo-icon" size={28} />
          AI Trip Planner
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Link to="/plan" className={`nav-link ${location.pathname === '/plan' ? 'active' : ''}`}>Plan Trip</Link>
          </li>
          <li>
            <Link to="/history" className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}>History</Link>
          </li>
        </ul>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {localStorage.getItem('token') ? (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                {(() => {
                  try {
                    const u = JSON.parse(localStorage.getItem('user'));
                    return u?.username || u?.name || 'User';
                  } catch {
                    return 'User';
                  }
                })()}
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
                className="btn btn-outline"
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
