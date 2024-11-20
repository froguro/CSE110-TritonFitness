import React from 'react'; //imports React
import './StreakPopup.css'; //imports CSS
import streakCharacter from './streak-character.png'; // imports the image, we can use the name streakCharacter as a variable 

const StreakPopup = () => { // defining a functional react component called StreakPopup
    return ( 
      <div className="popup-container">
        <div className="popup-content">
          <img src={streakCharacter} alt="Streak Character" className="streak-image" /> 
          <h1 className="streak-number">2</h1>
          <p className="streak-text">day streak!</p>
          <p className="streak-info">You have logged in your exercises two days in a row! </p>
          <button className="streak-button">SHARE</button>
          <button className="continue-link">continue</button>
        </div>
      </div>
    );
  };
  
  export default StreakPopup; // makes the StreakPopup component available for use in other parts of the app (ex: we can import it into App.tsx and display it as needed)