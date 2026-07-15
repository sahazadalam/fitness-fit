import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Email, 
  Phone, 
  LocationOn,
  Send,
  Message,
  Person,
  CheckCircle
} from '@mui/icons-material';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Message /> Contact Us
        </motion.h2>

        <div className="contact-container">
          <motion.div 
            className="contact-info glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-title">Get in Touch</h3>
            <p className="contact-description">
              Have questions about your fitness journey? We're here to help!
              Reach out to us and we'll respond within 24 hours.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon" style={{ background: '#667eea' }}>
                  <Email />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">joeln1084@gmail.com</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" style={{ background: '#f093fb' }}>
                  <Phone />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 9779910388</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" style={{ background: '#4facfe' }}>
                  <LocationOn />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Bangalore, India</span>
                </div>
              </div>
            </div>

            <div className="contact-hours">
              <h4>Working Hours</h4>
              <div className="hours-grid">
                <div>
                  <span>Monday - Friday</span>
                  <span className="hours-time">9:00 AM - 9:00 PM</span>
                </div>
                <div>
                  <span>Saturday - Sunday</span>
                  <span className="hours-time">10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="form-title">Send Us a Message</h3>
            
            {submitted && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CheckCircle style={{ color: '#43e97b' }} />
                <span>Your message has been sent successfully!</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <Person /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Email /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <Message /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;