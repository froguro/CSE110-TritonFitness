import React, { useState } from 'react'; //imports React
import './StreakPopup.css'; //imports CSS
import streakCharacter from './streak-character.png'; // imports the image, we can use the name streakCharacter as a variable 
import profilePlaceholder from '../homepage/profileplaceholder.svg';
import { User } from '../types/user';

interface StreakPopupProps {
  user: User | null;
}


const StreakPopup: React.FC<StreakPopupProps> = ({ user }) => {


  const [isVisible, setIsVisible] = useState(false); // State to control popup visibility

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  if (!user) {
    return <p className="no-user-message">No user data available. Please log in.</p>;
  }

    return ( 
      <div>
        <button className="open-streak-popup-button" onClick={togglePopup}>
          {isVisible ? 'Close Streak' : '🔥 Show Streak'}
        </button>

        <div className={`popup-container ${isVisible ? 'visible' : 'hidden'}`}> {/* Dynamic class for visibility */}
          <div className="popup-content">
            {/* <img src={streakCharacter} alt="Streak Character" className="streak-image" /> Displays the streak character image */}
              <img
                src={user.picture || profilePlaceholder}
                alt="Profile Avatar"
                className="avatar-image"
                onError={(e) => {
                  e.currentTarget.src = profilePlaceholder;
              }}
              />
            <h1 className="streak-number">15</h1> {/* Displays the number "2" */}
            <p className="streak-text">day streak!</p> {/* Displays the text "day streak!" */}
            <p className="streak-info">You have logged in your exercises <br /> fifteen days in a row! </p> {/* Additional streak info! */}
            <button className="share-button">SHARE</button> {/* SHARE button (not functional for now) */}
            <button className="continue-button" onClick={togglePopup}>Exit</button> {/* Triggers the slide-down animation */}
          </div>
        </div>
      </div>
    );
};

export default StreakPopup; // makes the StreakPopup component available for use in other parts of the app (ex: we can import it into App.tsx and display it as needed)
