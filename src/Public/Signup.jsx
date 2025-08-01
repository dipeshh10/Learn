import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login.svg';  // Use the same image as login
import '../Style/Signup.css';                // Use premium CSS similar to Login.css

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  } 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5002/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400 && data.message.includes('already exists')) {
          setError('User with this email is already registered. Please use a different email or login.');
        } else {
          setError(data.message || 'Signup failed');
        }
        return;
      }
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Signup error:', err);
      if (err.message.includes('fetch')) {
        setError('Unable to connect to server. Please make sure the backend server is running.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" aria-busy={loading}>
      <div className="login-wrapper" role="main" tabIndex={-1}>
        {/* Left Side Image */}
        <div className="login-image" aria-hidden="true">
          <img src={loginImage} alt="" aria-hidden="true" />
        </div>

        {/* Right Side Card */}
        <div className="login-card" aria-label="Signup form">
          <div className="login-header">
            <h2>CREATE ACCOUNT</h2>
            <p>Please fill in your details</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              disabled={loading}
              aria-invalid={!!error}
            />
            </div>

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

            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
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

            <div className="form-group">
              <label htmlFor="role">Signup as</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
              aria-live="polite"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
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

            {success && (
              <div
                role="status"
                aria-live="polite"
                style={{ color: 'green', marginTop: 12, fontWeight: '600' }}
              >
                {success}
              </div>
            )}
          </form>

          <div className="signup-link" style={{ marginTop: 28 }}>
            Already have an account?
            <Link to="/login" style={{ marginLeft: 6, color: '#2563eb', fontWeight: '700' }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;