import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Timeline, 
  TrendingUp, 
  FitnessCenter,
  BarChart,
  ShowChart,
  PieChart
} from '@mui/icons-material';
import './ProgressTracker.css';

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState([
    { week: 'Week 1', weight: 75, workouts: 4 },
    { week: 'Week 2', weight: 74, workouts: 5 },
    { week: 'Week 3', weight: 73.5, workouts: 4 },
    { week: 'Week 4', weight: 72, workouts: 6 },
    { week: 'Week 5', weight: 71.5, workouts: 5 },
  ]);

  const [newEntry, setNewEntry] = useState({ week: '', weight: '', workouts: '' });

  const addProgress = () => {
    if (newEntry.week && newEntry.weight && newEntry.workouts) {
      setProgressData([
        ...progressData,
        {
          week: newEntry.week,
          weight: parseFloat(newEntry.weight),
          workouts: parseInt(newEntry.workouts)
        }
      ]);
      setNewEntry({ week: '', weight: '', workouts: '' });
    }
  };

  const calculateStats = () => {
    if (progressData.length === 0) return null;
    
    const weights = progressData.map(d => d.weight);
    const workoutsCount = progressData.map(d => d.workouts);
    
    const startWeight = weights[0];
    const currentWeight = weights[weights.length - 1];
    const weightChange = (currentWeight - startWeight).toFixed(1);
    const avgWorkouts = (workoutsCount.reduce((a, b) => a + b, 0) / workoutsCount.length).toFixed(1);
    const totalWorkouts = workoutsCount.reduce((a, b) => a + b, 0);
    const bestWeek = Math.max(...workoutsCount);

    return {
      startWeight,
      currentWeight,
      weightChange,
      avgWorkouts,
      totalWorkouts,
      bestWeek
    };
  };

  const stats = calculateStats();

  return (
    <section className="progress-tracker" id="progress">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Timeline /> Progress Tracker
        </motion.h2>

        {stats && (
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stat-card glass-card">
              <div className="stat-icon" style={{ background: '#667eea' }}>
                <TrendingUp />
              </div>
              <div className="stat-info">
                <span className="stat-label">Weight Change</span>
                <span className="stat-value" style={{ color: parseFloat(stats.weightChange) < 0 ? '#43e97b' : '#ff6b6b' }}>
                  {stats.weightChange} kg
                </span>
              </div>
            </div>
            
            <div className="stat-card glass-card">
              <div className="stat-icon" style={{ background: '#f093fb' }}>
                <BarChart />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Workouts</span>
                <span className="stat-value">{stats.totalWorkouts}</span>
              </div>
            </div>
            
            <div className="stat-card glass-card">
              <div className="stat-icon" style={{ background: '#4facfe' }}>
                <ShowChart />
              </div>
              <div className="stat-info">
                <span className="stat-label">Avg Workouts/Week</span>
                <span className="stat-value">{stats.avgWorkouts}</span>
              </div>
            </div>
            
            <div className="stat-card glass-card">
              <div className="stat-icon" style={{ background: '#43e97b' }}>
                <FitnessCenter />
              </div>
              <div className="stat-info">
                <span className="stat-label">Best Week</span>
                <span className="stat-value">{stats.bestWeek} workouts</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="progress-grid">
          <motion.div 
            className="progress-chart glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="chart-title">Weekly Progress</h3>
            <div className="chart-container">
              {progressData.map((data, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar weight-bar"
                      style={{ 
                        height: `${(data.weight / 100) * 100}%`,
                        background: `linear-gradient(180deg, #667eea, #764ba2)`
                      }}
                    >
                      <span className="bar-value">{data.weight}kg</span>
                    </div>
                    <div 
                      className="chart-bar workout-bar"
                      style={{ 
                        height: `${(data.workouts / 10) * 100}%`,
                        background: `linear-gradient(180deg, #f093fb, #f5576c)`
                      }}
                    >
                      <span className="bar-value">{data.workouts}</span>
                    </div>
                  </div>
                  <span className="bar-label">{data.week}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <span><span className="legend-dot weight-dot"></span> Weight (kg)</span>
              <span><span className="legend-dot workout-dot"></span> Workouts</span>
            </div>
          </motion.div>

          <motion.div 
            className="progress-input glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="input-title">Add Progress Entry</h3>
            <div className="input-group">
              <label>Week</label>
              <input
                type="text"
                value={newEntry.week}
                onChange={(e) => setNewEntry({ ...newEntry, week: e.target.value })}
                placeholder="e.g., Week 6"
              />
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={newEntry.weight}
                onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                placeholder="e.g., 70"
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label>Workouts This Week</label>
              <input
                type="number"
                value={newEntry.workouts}
                onChange={(e) => setNewEntry({ ...newEntry, workouts: e.target.value })}
                placeholder="e.g., 4"
                min="0"
                max="7"
              />
            </div>
            <motion.button
              className="add-progress-btn"
              onClick={addProgress}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!newEntry.week || !newEntry.weight || !newEntry.workouts}
            >
              Add Entry
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;