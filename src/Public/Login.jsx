import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/read.png'; // Replace with your premium image path
import logoIcon from '../assets/wow.png';    // Replace with your logo path
import '../Style/Login.css';                 // Make sure to include the premium CSS or inline styles below

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);

      const role = data.user.role.toLowerCase();
      navigate(`/dashboard/${role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" aria-busy={loading}>
      <div className="login-wrapper" role="main" tabIndex={-1}>
        {/* Left side image */}
        <div className="login-image" aria-hidden="true">
          <img src={loginImage} alt="" aria-hidden="true" />
        </div>

        {/* Right side card */}
        <div className="login-card" aria-label="Login form">
          <h1 className="logo" tabIndex={-1}>
            <img src={logoIcon} alt="Smart Shiksha Logo" className="logo-icon" />
            Smart Shiksha
          </h1>

          <div className="login-header">
            <h2>WELCOME BACK</h2>
            <p>Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-invalid={!!error}
              />
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                aria-invalid={!!error}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
                disabled={loading}
                style={{
                  position: 'absolute',
                  top: '38px',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#2563eb',
                  padding: 0,
                  userSelect: 'none',
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
              aria-live="polite"
            >
              {loading ? 'Signing in...' : 'Sign in'}
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
            Don&apos;t have an account?
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