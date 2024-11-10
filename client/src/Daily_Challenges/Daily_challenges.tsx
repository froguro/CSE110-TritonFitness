import React, { useState } from 'react';
import './Daily_challenges.css';

const exerciseList = [
  '10 Push-ups',
  '15 Squats',
  '30-second Plank',
  '20 Jumping Jacks',
  '10 Lunges per leg',
  '30-second Wall Sit',
  '15 Sit-ups',
];

const DailyChallenges = () => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [dailyChallenges, setDailyChallenges] = useState<string[]>([]);

  const generateNewChallenges = () => {
    const shuffled = [...exerciseList].sort(() => 0.5 - Math.random());
    const selectedChallenges = shuffled.slice(0, 3);
    setDailyChallenges(selectedChallenges);
  };

  const handleShowChallenge = () => {
    generateNewChallenges();
    setShowChallenge(true);
  };

  const handleHideChallenge = () => {
    setShowChallenge(false);
  };

  return (
    <div className="daily-challenges-container">
      <button onClick={handleShowChallenge} className="daily-challenges-button">
        Show Challenges
      </button>
      {showChallenge && (
        <div className="daily-challenges-overlay">
          <div className="daily-challenges-popup">
            <h2 style={{ color: 'black' }}>Today's Challenges</h2>
            <ul className="daily-challenges-list">
              {dailyChallenges.map((exercise, index) => (
                <li key={index} className="daily-challenges-item">
                  <span>{exercise}</span>
                  <span className="points">10 points</span>
                </li>
              ))}
            </ul>
            <button onClick={handleHideChallenge} className="daily-challenges-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;