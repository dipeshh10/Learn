import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login.svg';
import logoIcon from '../assets/LearnX.png';
import '../Style/Login.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Clear any existing localStorage data first
      localStorage.clear();
      
      const res = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          role: 'admin' // Explicitly specify admin role
        }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check if user is actually an admin
      if (data.user.role !== 'admin') {
        throw new Error('Access denied. Admin credentials required.');
      }

      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Redirect to admin dashboard
      navigate('/dashboard/admin');
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" aria-busy={loading}>
      <div className="login-wrapper" role="main" tabIndex={-1}>
        <div className="login-image" aria-hidden="true">
          <img src={loginImage} alt="" aria-hidden="true" />
        </div>
        <div className="login-card" aria-label="Admin login form">
          <div className="login-header">
            <h2>ADMIN LOGIN</h2>
            <p>Administrator access only</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@learnx.com"
                required
                disabled={loading}
                aria-invalid={!!error}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                required
                disabled={loading}
                aria-invalid={!!error}
              />
            </div>
            <button
              type="submit"
              className="signin-button"
              disabled={loading}
              aria-live="polite"
            >
              {loading ? 'Signing in...' : 'Admin Login'}
            </button>
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                style={{ color: 'red', marginTop: 12, fontWeight: '600' }}
              >
                {error}
              </div>
            )}
          </form>
          <div className="signup-link" style={{ marginTop: 28 }}>
            <Link to="/login" style={{ color: '#2563eb', fontWeight: '700' }}>
              ← Back to Regular Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
