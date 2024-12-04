import React, { useState } from 'react'; //imports React
import './StreakPopup.css'; //imports CSS
import streakCharacter from './streak-character.png'; // imports the image, we can use the name streakCharacter as a variable 

const StreakPopup = () => { // defining a functional react component called StreakPopup
    const [isVisible, setIsVisible] = useState(true); // State to control popup visibility (true = visible, false = hidden)

    const handleContinue = () => { // Function to handle "continue" button click
        setIsVisible(false); // Set visibility to false, triggering the slide-down animation

        // Optional: Add any cleanup logic here after animation ends
        setTimeout(() => {
            console.log("Popup hidden"); // Example cleanup logic (remove if unnecessary)
        }, 500); // Match the animation duration in CSS (0.5s)
    };

    return ( 
      <div className={`popup-container ${isVisible ? 'visible' : 'hidden'}`}> {/* Dynamic class for visibility */}
        <div className="popup-content">
          <img src={streakCharacter} alt="Streak Character" className="streak-image" /> {/* Displays the streak character image */}
          <h1 className="streak-number">2</h1> {/* Displays the number "2" */}
          <p className="streak-text">day streak!</p> {/* Displays the text "day streak!" */}
          <p className="streak-info">You have logged in your exercises <br /> two days in a row! </p> {/* Additional streak info! */}
          <button className="share-button">SHARE</button> {/* SHARE button (not functional for now) */}
          <button className="continue-button" onClick={handleContinue}>continue</button> {/* Triggers the slide-down animation */}
        </div>
      </div>
    );
};

export default StreakPopup; // makes the StreakPopup component available for use in other parts of the app (ex: we can import it into App.tsx and display it as needed)
