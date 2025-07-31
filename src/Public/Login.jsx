
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/read.png';
import logoIcon from '../assets/wow.png';
import '../Style/Login.css';

const Login = () => {
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
      const res = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      // Redirect based on role
      if (data.user.role === 'teacher') navigate('/teacher/dashboard');
      else if (data.user.role === 'student') navigate('/student/dashboard');
      else if (data.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
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
        <div className="login-card" aria-label="Login form">
          <h1 className="logo" tabIndex={-1}>
            <img src={logoIcon} alt="Learn X Logo" className="logo-icon" />
            Learn X
          </h1>
          <div className="login-header">
            <h2>LOGIN</h2>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
                aria-invalid={!!error}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
              {loading ? 'Signing in...' : 'Sign In'}
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
            Don't have an account?
            <Link to="/signup" style={{ marginLeft: 6, color: '#2563eb', fontWeight: '700' }}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;