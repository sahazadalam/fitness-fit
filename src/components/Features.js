import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FitnessCenter, 
  Restaurant, 
  Timeline, 
  People, 
  Smartphone, 
  EmojiEvents,
  TrendingUp,
  Security,
  Speed,
  ThumbUp
} from '@mui/icons-material';
import './Features.css';

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <FitnessCenter />,
      title: 'AI-Powered Workouts',
      description: 'Smart workout plans that adapt to your progress and goals using advanced AI algorithms',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      icon: <Restaurant />,
      title: 'Smart Diet Planning',
      description: 'Personalized nutrition plans based on your dietary preferences, allergies, and fitness goals',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
    },
    {
      icon: <Timeline />,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed insights, charts, and performance metrics',
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    },
    {
      icon: <People />,
      title: 'Community & Support',
      description: 'Connect with like-minded individuals, share experiences, and get motivated together',
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    },
    {
      icon: <Smartphone />,
      title: 'Mobile Optimized',
      description: 'Access your fitness plans anywhere, anytime on any device with seamless syncing',
      color: '#fa709a',
      gradient: 'linear-gradient(135deg, #fa709a, #fee140)'
    },
    {
      icon: <EmojiEvents />,
      title: 'Achievement System',
      description: 'Earn badges, rewards, and recognition for reaching your fitness milestones',
      color: '#f6d365',
      gradient: 'linear-gradient(135deg, #f6d365, #fda085)'
    },
    {
      icon: <Security />,
      title: 'Data Privacy',
      description: 'Your health data is secure with bank-grade encryption and privacy controls',
      color: '#a18cd1',
      gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)'
    },
    {
      icon: <Speed />,
      title: 'Real-time Feedback',
      description: 'Get instant feedback and suggestions to optimize your performance and results',
      color: '#ffecd2',
      gradient: 'linear-gradient(135deg, #fcb69f, #ffecd2)'
    },
    {
      icon: <ThumbUp />,
      title: 'Expert Guidance',
      description: 'Access to certified trainers and nutritionists for professional advice',
      color: '#a8edea',
      gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Why Choose Fitness-Fit?</h2>
          <p className="section-subtitle">
            Experience the future of fitness with our AI-powered platform
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-card glass-card ${hoveredIndex === index ? 'hovered' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg" style={{ background: feature.gradient }}></div>
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              <motion.div 
                className="feature-hover-effect"
                initial={{ width: 0 }}
                animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: feature.gradient }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>Ready to start your fitness journey?</p>
          <button className="btn-gradient">Get Started Now</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;