import { useState } from 'react';
import { Users, X } from 'lucide-react';

const Footer = () => {
  const [showDevs, setShowDevs] = useState(false);

  // You can easily edit these names and roles!
  const developers = [
    { name: "Mayank", UID: "24BCS11383", role: "Full Stack Developer" },
    { name: "Kartik Mishra", UID: "24BCS10067", role: "Frontend Engineer" },
    { name: "Ansh Goyal", UID: "24BCS10135", role: "Frontend Engineer" },
    { name: "Monika Kartiyar", UID: "24BCS11405", role: "Backend Engineer" }
  ];

  return (
    <footer style={{
      textAlign: 'center',
      padding: '25px 20px',
      marginTop: 'auto',
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(40, 43, 43, 0.5)',
      color: 'var(--text-muted)',
      position: 'relative'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          className="btn btn-outline"
          onClick={() => setShowDevs(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 30px' }}
        >
          <Users size={20} />
          Developers
        </button>
      </div>

      {showDevs && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(26, 28, 28, 0.9)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div className="glass-panel" style={{ padding: '40px', maxWidth: '750px', width: '90%', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
            <button
              onClick={() => setShowDevs(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <X size={28} />
            </button>

            <h2 style={{ marginBottom: '20px', color: 'var(--text-light)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
              Meet the Team
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 2fr 2fr 2fr', gap: '15px', color: 'var(--text-light)', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
              <span>#</span>
              <span>Name</span>
              <span>UID</span>
              <span>Role</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {developers.map((dev, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.4fr 2fr 2fr 2fr', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{i + 1}</span>
                  <strong><span style={{ color: 'var(--primary)', fontSize: '1.15rem', fontWeight: 'bold' }}>{dev.name}</span></strong>
                  <span style={{ color: 'var(--text-light)' }}>{dev.UID}</span>
                  <span style={{ color: 'var(--accent)' }}>{dev.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
