import React, { useState } from 'react';
import homepageboxicon from "./homepage-box-icon.svg";
import threelinedropdown from './three-line-dropdown.svg';
import profileplaceholder from './profileplaceholder.svg';
import './HomePage.css';

const emotionsList: string[] = [
  'Sad', 'Happy', 'Irritated', 'Angry', 'Sleepy', 'Anxious',
  'Calm', 'Disgust', 'Fearful', 'Motivated', 'Lazy'
];

const HomePage: React.FC = () => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = () => {
    console.log('Emotions submitted:', selectedEmotions);
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

    return (
        <div className="homepage">
            <div className="homepage-header">
                <img src={threelinedropdown} /> 
                <h1>Home</h1>
                <img src={profileplaceholder} />
            </div>
            <div className="homepage-horizontal-line"></div>
            <div className="homepage-section-list">
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Record Your Matrix</h2>
                            <p>Record your fitness metrics to monitor your strengths and track
                                the progression of your physical abilities.
                            </p>
                        </div>
                        <button className="homepage-section-box-button">Record Now</button>
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Daily Challenges</h2>
                            <p>Complete daily challenges to boost your athletic growth and alleviate
                                your stress. You can earn points by completing daily challenges that
                                can be redeemed for customizing your profile. Daily challenges can 
                                also be used for recovering a lost streak if you miss a workout.
                            </p>
                        </div>
                        <button className="homepage-section-box-button">View Challenges</button>
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Watch Video Demonstrations</h2>
                            <p>View video demonstrations to learn how to perform
                                exercises correctly and safely. On this page, you will
                                be provided with options to navigate between categories of videos,
                                provide feedback on videos, like or dislike videos, and share/save videos.
                            </p>
                        </div>
                        <button className="homepage-section-box-button">Watch Now</button>
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Emotions Tracker</h2>
                            <p>Select tags that describe your emotions today(happy, sad, anxious, etc.)
                                to log your emotions for the day. This information will be stored so that you
                                can view the history of your mood patterns. 
                            </p>
                        </div>
                        <button className="homepage-section-box-button" onClick={openModal}>Log Emotions</button>
                    </div>
                </div>
            </div>
            {/* Modal for Emotion Tracker */}
            {isModalOpen && (
                <div className="overlay">
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
                </div>
            )}
            {showSuccessMessage && (
                <div className="success-message">
                    Emotions successfully submitted!
                </div>
      )}
        </div>
    );
    
}

export default HomePage;