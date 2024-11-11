import React, { useState } from 'react';
import './emotionsTracker.css';

const emotionsList = [
  'Sad', 'Happy', 'Irritated', 'Angry', 'Sleepy', 'Anxious', 
  'Calm', 'Disgust', 'Fearful', 'Motivated', 'Lazy'
];

const EmotionTracker = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const toggleEmotion = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = () => {
    // This can be connected to the backend when your partner's work is done
    console.log('Emotions submitted:', selectedEmotions);
  };

  return (
    <div className="emotion-tracker">
      <h2>Emotion Tracker</h2>
      <p>How are you feeling? Select all that you have felt today</p>
      <div className="emotions-container">
        {emotionsList.map(emotion => (
          <button
            key={emotion}
            className={`emotion-button ${selectedEmotions.includes(emotion) ? 'selected' : ''}`}
            onClick={() => toggleEmotion(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default EmotionTracker;