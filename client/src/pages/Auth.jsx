import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, Calendar, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    dob: '',
    phone: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const baseUrl = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '') : '';
    
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || (isLogin ? 'Failed to login' : 'Failed to register'));
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)', padding: '40px 20px' }}>
      <div className="glass-panel animate-fade-in-up" style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'white' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Login to continue planning your trips' : 'Enter your details to get started'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(255, 82, 82, 0.1)', border: '1px solid #FF5252', padding: '12px', borderRadius: '8px', color: '#FF5252', marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="username"
                className="input-field" 
                style={{ width: '100%', paddingLeft: '45px' }} 
                placeholder="johndoe123"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="name"
                    className="input-field" 
                    style={{ width: '100%', paddingLeft: '45px' }} 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Date of Birth</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="date" 
                    name="dob"
                    className="input-field" 
                    style={{ width: '100%', paddingLeft: '45px' }} 
                    value={formData.dob}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="tel" 
                    name="phone"
                    className="input-field" 
                    style={{ width: '100%', paddingLeft: '45px' }} 
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    name="email"
                    className="input-field" 
                    style={{ width: '100%', paddingLeft: '45px' }} 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                className="input-field" 
                style={{ width: '100%', paddingLeft: '45px', paddingRight: '45px' }} 
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')} <ArrowRight size={18} />
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleMode} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', marginLeft: '5px', cursor: 'pointer' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
