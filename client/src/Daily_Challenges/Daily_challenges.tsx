import React, { useState } from 'react';
import './Daily_challenges.css';

const exerciseList = [
  { name: '10 Push-ups', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
  { name: '15 Squats', videoUrl: 'https://www.youtube.com/watch?v=m0GcZ24pK6k' },
  { name: '30-second Plank', videoUrl: 'https://www.youtube.com/watch?v=yeKv5oX_6GY' },
  { name: '20 Jumping Jacks', videoUrl: 'https://www.youtube.com/watch?v=q_Z29u7nglQ' },
  { name: '10 Lunges per leg', videoUrl: 'https://www.youtube.com/watch?v=tTej-ax9XiA' },
  { name: '30-second Wall Sit', videoUrl: 'https://www.youtube.com/watch?v=eb7vLD6V-iU' },
  { name: '15 Sit-ups', videoUrl: 'https://www.youtube.com/watch?v=jDwoBqPH0jk' },
];

interface DailyChallengesProps {
  buttonBackgroundColor: string; // Add prop for button background color
}
const DailyChallenges: React.FC<DailyChallengesProps> = ({ buttonBackgroundColor }) => {

  const [showChallenge, setShowChallenge] = useState(false);
  const [dailyChallenges, setDailyChallenges] = useState<{ name: string; videoUrl: string }[]>([]);

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
      {/* Apply dynamic background color to the button */}
      <button
        onClick={handleShowChallenge}
        className="daily-challenges-button"
        style={{ backgroundColor: buttonBackgroundColor }}
      >
        Show Challenges
      </button>
      {showChallenge && (
        <div className="daily-challenges-overlay">
          <div className="daily-challenges-popup">
            <h2 style={{ color: 'black' }}>Today's Challenges</h2>
            <ul className="daily-challenges-list">
              {dailyChallenges.map((exercise, index) => (
                <li key={index} className="daily-challenges-item">
                  <span>{exercise.name}</span>
                  <span className="points">10 points</span>
                  <button
                    onClick={() => window.open(exercise.videoUrl, '_blank')}
                    className="video-button"
                    style={{ backgroundColor: buttonBackgroundColor }} // Apply dynamic background color
                  >
                    Watch Video
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleHideChallenge}
              className="daily-challenges-close-button"
              style={{ backgroundColor: buttonBackgroundColor }} // Apply dynamic background color
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;
