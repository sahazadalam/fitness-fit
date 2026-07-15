import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  YouTube,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">
              <span className="logo-icon">💪</span>
              <span className="logo-text">Fitness-Fit</span>
            </div>
            <p className="footer-description">
              Transform your fitness journey with AI-powered workouts,
              personalized nutrition plans, and a supportive community.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link"><Facebook /></a>
              <a href="#" className="social-link"><Twitter /></a>
              <a href="#" className="social-link"><Instagram /></a>
              <a href="#" className="social-link"><YouTube /></a>
            </div>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/workouts">Workouts</Link></li>
              <li><Link to="/diet">Diet Plans</Link></li>
              <li><Link to="/bmi">BMI Calculator</Link></li>
              <li><Link to="/progress">Progress Tracker</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-item">
              <Email className="contact-icon" />
              <span>joeln1084@gmail.com</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span>+91 9779910388</span>
            </div>
            <div className="contact-item">
              <LocationOn className="contact-icon" />
              <span>Bangalore, India</span>
            </div>
            <div className="contact-item" style={{ marginTop: '10px', color: '#667eea' }}>
              <span style={{ fontSize: '0.9rem' }}>Founder: Joel</span>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Fitness-Fit. All rights reserved. | Developed by Joel</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;