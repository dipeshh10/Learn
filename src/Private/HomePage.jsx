import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Style/HomePage.css';
import HeroImage from '../assets/read.png';
import logoIcon from '../assets/wow.png'; // Your logo image path

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Top Navigation */}
      <motion.header
        className="navbar glass"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 17, delay: 0.1 }}
      >
        <div className="logo" tabIndex={-1}>
          <img src={logoIcon} alt="LearnX Logo" className="logo-image" />
          <span>LEARNX</span>
        </div>
        <nav className="nav-links" aria-label="Primary Navigation">
          <Link to="/login" className="nav-link" tabIndex={0}>
            Login
          </Link>
          <button
            onClick={() => navigate('/signup')}
            className="signup-btn"
            aria-label="Signup"
            type="button"
          >
            Signup
          </button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="hero-section" aria-label="Hero Section">
        <motion.div
          className="hero-content"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <h1>
            LEARNX <br />
            <motion.span
              className="highlight"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            >
              EDUCATION FOR ALL
            </motion.span>
          </h1>
          <p className="hero-subtitle" aria-live="polite">
            The best Learning Management System platform
          </p>
          <motion.button
            className="get-started"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started with LearnX"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <img src={HeroImage} alt="E-learning Illustration" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer glass" role="contentinfo">
        <div className="footer-container">
          <div className="footer-item">
            <h4>Contact Us</h4>
            <p>📞 9818505045</p>
            <p>📧 support@learnx.com</p>
            <p>🏢 Baneshwor, Kathmandu</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
