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
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      color: 'var(--text-muted)',
      position: 'relative'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          className="btn btn-outline"
          onClick={() => setShowDevs(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 26px' }}
        >
          <Users size={18} color="var(--primary)" />
          Developers
        </button>
      </div>

      {showDevs && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ padding: '36px', maxWidth: '750px', width: '100%', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
            <button
              onClick={() => setShowDevs(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'none'; }}
            >
              <X size={24} />
            </button>

            <h2 style={{ marginBottom: '20px', color: 'var(--text-pure)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '15px', fontSize: '1.6rem' }}>
              Meet the Team
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 2fr 2fr 2fr', gap: '15px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '15px', paddingLeft: '15px', paddingRight: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>#</span>
              <span>Name</span>
              <span>UID</span>
              <span>Role</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {developers.map((dev, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.4fr 2fr 2fr 2fr', gap: '15px', alignItems: 'center', background: 'rgba(223, 230, 233, 0.04)', padding: '14px 15px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontWeight: '500' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{i + 1}</span>
                  <strong style={{ color: 'var(--text-pure)', fontSize: '1.05rem', fontWeight: '700' }}>{dev.name}</strong>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>{dev.UID}</span>
                  <span style={{ color: 'var(--badge-text)', fontSize: '0.88rem', background: 'var(--badge-bg)', padding: '4px 12px', borderRadius: '20px', width: 'fit-content', border: '1px solid var(--badge-border)', fontWeight: '600' }}>{dev.role}</span>
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
