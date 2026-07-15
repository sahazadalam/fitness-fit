import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculate, 
  Height, 
  FitnessCenter,
  Warning
} from '@mui/icons-material';
import './BMIcalculator.css';

const BMIcalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBMI = Math.round(bmiValue * 10) / 10;
      setBmi(roundedBMI);

      let categoryText, adviceText;
      if (roundedBMI < 18.5) {
        categoryText = 'Underweight';
        adviceText = 'Consider gaining weight through a balanced diet rich in proteins and healthy fats. Consult a nutritionist for a personalized plan.';
      } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        categoryText = 'Normal Weight';
        adviceText = 'Great job! Maintain your current lifestyle with regular exercise and balanced nutrition.';
      } else if (roundedBMI >= 25 && roundedBMI < 30) {
        categoryText = 'Overweight';
        adviceText = 'Focus on a calorie-controlled diet and increase physical activity. Aim for 30 minutes of exercise daily.';
      } else {
        categoryText = 'Obese';
        adviceText = 'Consult a healthcare professional for a personalized weight loss plan. Start with moderate exercise and dietary changes.';
      }
      setCategory(categoryText);
      setAdvice(adviceText);
    }
  };

  const getCategoryColor = () => {
    switch(category) {
      case 'Underweight': return '#ff6b6b';
      case 'Normal Weight': return '#43e97b';
      case 'Overweight': return '#f6d365';
      case 'Obese': return '#ff6b6b';
      default: return '#667eea';
    }
  };

  return (
    <section className="bmi-calculator" id="bmi">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Calculate /> BMI Calculator
        </motion.h2>

        <div className="bmi-container">
          <motion.div 
            className="bmi-input glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="input-group">
              <label>
                <Height /> Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                min="50"
                max="300"
              />
            </div>
            
            <div className="input-group">
              <label>
                <FitnessCenter /> Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                min="10"
                max="500"
              />
            </div>

            <motion.button
              className="calculate-btn"
              onClick={calculateBMI}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!height || !weight}
            >
              Calculate BMI
            </motion.button>
          </motion.div>

          {bmi !== null && (
            <motion.div 
              className="bmi-results glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="result-circle" style={{ borderColor: getCategoryColor() }}>
                <span className="bmi-value">{bmi}</span>
                <span className="bmi-label">BMI</span>
              </div>

              <div className="result-details">
                <h3 style={{ color: getCategoryColor() }}>{category}</h3>
                <div className="bmi-scale">
                  <div className="scale-track">
                    <div 
                      className="scale-fill" 
                      style={{ 
                        width: `${Math.min((bmi / 40) * 100, 100)}%`,
                        background: getCategoryColor()
                      }}
                    />
                  </div>
                  <div className="scale-labels">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>
                <p className="advice-text">
                  <Warning style={{ color: getCategoryColor(), marginRight: '10px' }} />
                  {advice}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BMIcalculator;