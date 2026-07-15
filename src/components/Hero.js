import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlayArrow, 
  TrendingUp, 
  People, 
  EmojiEvents,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    'Transform Your Body',
    'Build Muscle 💪',
    'Lose Weight 🎯',
    'Stay Healthy 🧘',
    'Join Community 👥'
  ];

  useEffect(() => {
    const typingEffect = () => {
      const currentPhrase = phrases[currentIndex];
      const isComplete = typedText === currentPhrase;
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        setTimeout(() => {}, 50);
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        setTimeout(() => {}, 100);
      }

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % phrases.length);
      }
    };

    const timer = setTimeout(typingEffect, 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentIndex]);

  const features = [
    { icon: <TrendingUp />, text: 'AI-Powered Workouts', color: '#667eea' },
    { icon: <People />, text: 'Community Support', color: '#f093fb' },
    { icon: <EmojiEvents />, text: 'Achievement Badges', color: '#f6d365' },
    { icon: <CheckCircle />, text: 'Personalized Plans', color: '#43e97b' }
  ];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-pulse"></span>
            🚀 AI-Powered Fitness Platform
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="typed-text">{typedText}</span>
            <span className="cursor-blink">|</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Experience the future of fitness with AI-powered workouts, 
            personalized nutrition plans, and a supportive community.
            Start your transformation journey today!
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button className="btn-gradient" onClick={() => navigate('/auth')}>
              Start Free Trial <ArrowForward />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/workouts')}>
              <PlayArrow /> Explore Workouts
            </button>
          </motion.div>

          <motion.div 
            className="hero-features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="feature-chip" style={{ borderColor: feature.color }}>
                <span style={{ color: feature.color }}>{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">50K</span>
                <span className="stat-plus">+</span>
              </div>
              <p>Active Users</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">1000</span>
                <span className="stat-plus">+</span>
              </div>
              <p>Workouts</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="counter">95</span>
                <span className="stat-percent">%</span>
              </div>
              <p>Satisfaction Rate</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-image-wrapper animate-float">
            <div className="hero-image-bg"></div>
            <div className="hero-image-content">
              <span className="hero-emoji">💪</span>
              <h3>Fitness-Fit AI</h3>
              <p>Your Personal Fitness Coach</p>
            </div>
            
            <div className="floating-card card-1 animate-float" style={{ animationDelay: '0s' }}>
              <span>🏋️</span>
              <div>
                <span>Daily Workout</span>
                <small>30 min</small>
              </div>
            </div>
            
            <div className="floating-card card-2 animate-float" style={{ animationDelay: '2s' }}>
              <span>🥗</span>
              <div>
                <span>Diet Plan</span>
                <small>Personalized</small>
              </div>
            </div>
            
            <div className="floating-card card-3 animate-float" style={{ animationDelay: '4s' }}>
              <span>📊</span>
              <div>
                <span>Track Progress</span>
                <small>Real-time</small>
              </div>
            </div>

            <div className="floating-card card-4 animate-float" style={{ animationDelay: '1s' }}>
              <span>🎯</span>
              <div>
                <span>Smart Goals</span>
                <small>AI Optimized</small>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;