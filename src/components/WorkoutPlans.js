import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AccessTime, 
  FitnessCenter, 
  PlayArrow,
  TrendingUp
} from '@mui/icons-material';
import './WorkoutPlans.css';

const WorkoutPlans = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const workouts = [
    {
      id: 1,
      title: 'Full Body HIIT',
      category: 'hiit',
      level: 'Intermediate',
      duration: '30 min',
      calories: '300-400',
      exercises: ['Jump Squats', 'Push-ups', 'Mountain Climbers'],
      image: '🏋️'
    },
    {
      id: 2,
      title: 'Strength Training',
      category: 'strength',
      level: 'Advanced',
      duration: '45 min',
      calories: '400-500',
      exercises: ['Deadlifts', 'Bench Press', 'Squats'],
      image: '💪'
    },
    {
      id: 3,
      title: 'Yoga Flow',
      category: 'yoga',
      level: 'Beginner',
      duration: '20 min',
      calories: '150-200',
      exercises: ['Sun Salutation', 'Warrior Pose', 'Tree Pose'],
      image: '🧘'
    },
    {
      id: 4,
      title: 'Cardio Blast',
      category: 'cardio',
      level: 'Intermediate',
      duration: '25 min',
      calories: '250-350',
      exercises: ['Jumping Jacks', 'Burpees', 'High Knees'],
      image: '🏃'
    },
    {
      id: 5,
      title: 'Core Workout',
      category: 'strength',
      level: 'Beginner',
      duration: '15 min',
      calories: '150-200',
      exercises: ['Planks', 'Crunches', 'Russian Twists'],
      image: '🎯'
    },
    {
      id: 6,
      title: 'Pilates Fusion',
      category: 'yoga',
      level: 'Intermediate',
      duration: '35 min',
      calories: '200-300',
      exercises: ['Hundreds', 'Scissors', 'Swimming'],
      image: '🧘‍♀️'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'hiit', label: 'HIIT' },
    { id: 'strength', label: 'Strength' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'cardio', label: 'Cardio' }
  ];

  const filteredWorkouts = selectedCategory === 'all' 
    ? workouts 
    : workouts.filter(w => w.category === selectedCategory);

  return (
    <section className="workouts" id="workouts">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FitnessCenter /> Workout Plans
        </motion.h2>

        <div className="workout-filters">
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="workouts-grid">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              className="workout-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <div className="workout-header">
                <span className="workout-emoji">{workout.image}</span>
                <span className="workout-level">{workout.level}</span>
              </div>
              
              <h3 className="workout-title">{workout.title}</h3>
              
              <div className="workout-meta">
                <span><AccessTime /> {workout.duration}</span>
                <span><TrendingUp /> {workout.calories} cal</span>
              </div>

              <div className="workout-exercises">
                {workout.exercises.map((exercise, i) => (
                  <span key={i} className="exercise-tag">{exercise}</span>
                ))}
              </div>

              <motion.button 
                className="workout-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayArrow /> Start Workout
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutPlans;