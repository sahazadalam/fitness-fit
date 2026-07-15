import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WorkoutPlans from './components/WorkoutPlans';
import DietPlans from './components/DietPlans';
import BMIcalculator from './components/BMIcalculator';
import ProgressTracker from './components/ProgressTracker';
import Community from './components/Community';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Auth from './components/Auth';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Fitness-Fit...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar user={user} setUser={setUser} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <WorkoutPlans />
              <DietPlans />
              <BMIcalculator />
              <ProgressTracker />
              <Community />
              <Contact />
            </>
          } />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/workouts" element={<WorkoutPlans />} />
          <Route path="/diet" element={<DietPlans />} />
          <Route path="/bmi" element={<BMIcalculator />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;