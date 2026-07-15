import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayArrow, 
  Pause, 
  SkipNext, 
  SkipPrevious,
  Timer,
  FitnessCenter,
  Close,
  CheckCircle,
  RestartAlt,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';
import './WorkoutPlayer.css';

const WorkoutPlayer = ({ workout, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [restTimer, setRestTimer] = useState(null);
  const [isResting, setIsResting] = useState(false);

  const exercises = workout.exercises || [
    'Jump Squats',
    'Push-ups', 
    'Mountain Climbers',
    'Planks',
    'Burpees'
  ];

  const exerciseDuration = 30; // seconds per exercise
  const restDuration = 10; // seconds rest between exercises

  useEffect(() => {
    let timer;
    if (isPlaying && !isResting) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Exercise complete
            const newCompleted = [...completedExercises, currentExercise];
            setCompletedExercises(newCompleted);
            
            if (currentExercise >= exercises.length - 1) {
              // All exercises complete
              setIsPlaying(false);
              setShowCelebration(true);
              return 0;
            }
            
            // Start rest period
            setIsResting(true);
            setRestTimer(restDuration);
            return 0;
          }
          return prev - 1;
        });
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentExercise, exercises.length, completedExercises, isResting]);

  useEffect(() => {
    let restTimerInterval;
    if (isResting && restTimer > 0) {
      restTimerInterval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            // Rest complete, move to next exercise
            setIsResting(false);
            setCurrentExercise((prev) => prev + 1);
            setTimeLeft(exerciseDuration);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restTimerInterval);
  }, [isResting, restTimer]);

  const togglePlay = () => {
    if (showCelebration) {
      resetWorkout();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const skipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setIsResting(false);
      setCurrentExercise(currentExercise + 1);
      setTimeLeft(exerciseDuration);
      setCompletedExercises([...completedExercises, currentExercise]);
    }
  };

  const resetWorkout = () => {
    setCurrentExercise(0);
    setTimeLeft(exerciseDuration);
    setTotalTime(0);
    setCompletedExercises([]);
    setIsPlaying(false);
    setShowCelebration(false);
    setIsResting(false);
    setRestTimer(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentExercise) / exercises.length) * 100;
  const exerciseProgress = ((exerciseDuration - timeLeft) / exerciseDuration) * 100;

  if (showCelebration) {
    return (
      <motion.div 
        className="workout-player-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="workout-celebration glass-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="celebration-content">
            <div className="celebration-emoji">🎉</div>
            <h2>Workout Complete!</h2>
            <p>Great job! You've completed all exercises.</p>
            <div className="celebration-stats">
              <div className="stat">
                <span className="stat-value">{exercises.length}</span>
                <span className="stat-label">Exercises</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">{formatTime(totalTime)}</span>
                <span className="stat-label">Total Time</span>
              </div>
            </div>
            <div className="celebration-buttons">
              <button className="btn-gradient" onClick={resetWorkout}>
                <RestartAlt /> Workout Again
              </button>
              <button className="btn-secondary" onClick={onClose}>
                <Close /> Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="workout-player-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="workout-player glass-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <button className="close-player" onClick={onClose}>
          <Close />
        </button>

        <div className="player-header">
          <h2 className="player-title">
            <FitnessCenter /> {workout.title || 'Workout'}
          </h2>
          <div className="player-timer">
            <Timer />
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        <div className="player-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            <span>Exercise {currentExercise + 1} of {exercises.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="exercise-container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentExercise}
              className="exercise-display"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {isResting ? (
                <div className="rest-display">
                  <div className="rest-icon">🧘</div>
                  <h3>Rest Time</h3>
                  <p>Get ready for the next exercise</p>
                  <div className="rest-timer">{restTimer}s</div>
                  <div className="rest-progress">
                    <div 
                      className="rest-progress-fill"
                      style={{ 
                        width: `${((restDuration - restTimer) / restDuration) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="exercise-number">
                    Exercise {currentExercise + 1}
                  </div>
                  <div className="exercise-name">
                    {exercises[currentExercise]}
                  </div>
                  <div className="exercise-timer">
                    <div className="timer-circle">
                      <svg viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#667eea"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 54}`}
                          strokeDashoffset={`${2 * Math.PI * 54 * (1 - exerciseProgress / 100)}`}
                          transform="rotate(-90 60 60)"
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                      </svg>
                      <div className="timer-text">
                        <span className="timer-value">{timeLeft}s</span>
                        <span className="timer-label">remaining</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="exercise-list">
          {exercises.map((ex, index) => (
            <div 
              key={index}
              className={`exercise-item ${index === currentExercise ? 'active' : ''} ${completedExercises.includes(index) ? 'completed' : ''}`}
            >
              <span className="exercise-number-badge">{index + 1}</span>
              <span className="exercise-name-text">{ex}</span>
              {completedExercises.includes(index) && (
                <CheckCircle className="exercise-check" />
              )}
            </div>
          ))}
        </div>

        <div className="player-controls">
          <button 
            className="control-btn secondary"
            onClick={() => {
              if (currentExercise > 0) {
                setCurrentExercise(currentExercise - 1);
                setTimeLeft(exerciseDuration);
                setCompletedExercises(completedExercises.filter(i => i !== currentExercise - 1));
              }
            }}
            disabled={currentExercise === 0 || isPlaying}
          >
            <SkipPrevious />
          </button>
          
          <button 
            className={`control-btn primary ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </button>
          
          <button 
            className="control-btn secondary"
            onClick={skipExercise}
            disabled={isResting || currentExercise >= exercises.length - 1}
          >
            <SkipNext />
          </button>
        </div>

        <div className="player-footer">
          <button 
            className="sound-toggle"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </button>
          <div className="workout-stats">
            <span>🔥 {Math.round(totalTime / 60)} min</span>
            <span>💪 {completedExercises.length}/{exercises.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutPlayer;