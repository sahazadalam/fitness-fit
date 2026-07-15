import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Restaurant, 
  BreakfastDining, 
  LunchDining, 
  DinnerDining,
  AccessTime,
  CheckCircle
} from '@mui/icons-material';
import './DietPlans.css';

const DietPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('weight-loss');
  
  const dietPlans = {
    'weight-loss': {
      title: 'Weight Loss Plan',
      description: 'Calorie-controlled meals for sustainable weight loss',
      meals: [
        { time: 'Breakfast', food: 'Oatmeal with Berries', calories: 300, icon: <BreakfastDining /> },
        { time: 'Lunch', food: 'Grilled Chicken Salad', calories: 400, icon: <LunchDining /> },
        { time: 'Dinner', food: 'Salmon with Vegetables', calories: 450, icon: <DinnerDining /> },
        { time: 'Snacks', food: 'Greek Yogurt with Nuts', calories: 150, icon: <Restaurant /> }
      ],
      totalCalories: 1300,
      protein: '35%',
      carbs: '40%',
      fat: '25%'
    },
    'muscle-gain': {
      title: 'Muscle Gain Plan',
      description: 'High protein meals for muscle growth and recovery',
      meals: [
        { time: 'Breakfast', food: 'Egg White Omelette', calories: 400, icon: <BreakfastDining /> },
        { time: 'Lunch', food: 'Chicken Breast with Rice', calories: 550, icon: <LunchDining /> },
        { time: 'Dinner', food: 'Beef with Sweet Potato', calories: 600, icon: <DinnerDining /> },
        { time: 'Snacks', food: 'Protein Shake', calories: 200, icon: <Restaurant /> }
      ],
      totalCalories: 1750,
      protein: '45%',
      carbs: '35%',
      fat: '20%'
    },
    'vegetarian': {
      title: 'Vegetarian Plan',
      description: 'Plant-based meals for a healthy lifestyle',
      meals: [
        { time: 'Breakfast', food: 'Smoothie Bowl', calories: 350, icon: <BreakfastDining /> },
        { time: 'Lunch', food: 'Quinoa and Vegetable Bowl', calories: 450, icon: <LunchDining /> },
        { time: 'Dinner', food: 'Lentil Curry with Rice', calories: 500, icon: <DinnerDining /> },
        { time: 'Snacks', food: 'Fruit and Nuts', calories: 150, icon: <Restaurant /> }
      ],
      totalCalories: 1450,
      protein: '30%',
      carbs: '45%',
      fat: '25%'
    }
  };

  const planTypes = [
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'vegetarian', label: 'Vegetarian' }
  ];

  const currentPlan = dietPlans[selectedPlan];

  return (
    <section className="diet-plans" id="diet">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Restaurant /> Diet Plans
        </motion.h2>

        <div className="diet-plan-selector">
          {planTypes.map(plan => (
            <motion.button
              key={plan.id}
              className={`plan-selector-btn ${selectedPlan === plan.id ? 'active' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {plan.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selectedPlan}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="diet-plan-content glass-card"
        >
          <div className="plan-header">
            <div>
              <h3 className="plan-title">{currentPlan.title}</h3>
              <p className="plan-description">{currentPlan.description}</p>
            </div>
            <div className="plan-stats">
              <div className="stat">
                <span className="stat-value">{currentPlan.totalCalories}</span>
                <span className="stat-label">Total Calories</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">{currentPlan.protein}</span>
                <span className="stat-label">Protein</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">{currentPlan.carbs}</span>
                <span className="stat-label">Carbs</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">{currentPlan.fat}</span>
                <span className="stat-label">Fat</span>
              </div>
            </div>
          </div>

          <div className="meals-grid">
            {currentPlan.meals.map((meal, index) => (
              <motion.div
                key={index}
                className="meal-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="meal-icon">{meal.icon}</div>
                <div className="meal-content">
                  <h4 className="meal-time">{meal.time}</h4>
                  <p className="meal-food">{meal.food}</p>
                  <span className="meal-calories">{meal.calories} kcal</span>
                </div>
                <CheckCircle className="meal-check" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DietPlans;