import React, { useState } from 'react';
import './ui_custom.css';

interface UICustomPopupProps {
  onChangeBackgroundColor: (color: string) => void; // Callback for body background color change
  onChangeBoxBackgroundColor: (color: string) => void; // Callback for box background color change
  onChangeButtonBackgroundColor: (color: string) => void; // Callback for button background color change
}

const UICustomPopup: React.FC<UICustomPopupProps> = ({
  onChangeBackgroundColor,
  onChangeBoxBackgroundColor,
  onChangeButtonBackgroundColor,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup visibility
  const [bodyBackgroundColor, setBodyBackgroundColor] = useState('#ffffff'); // Local state for body background
  const [boxBackgroundColor, setBoxBackgroundColor] = useState('#ffffff'); // Local state for box background
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#e0e0e0'); // Local state for button background

  const openPopup = () => setIsPopupOpen(true); // Open popup
  const closePopup = () => setIsPopupOpen(false); // Close popup

  const applyChanges = () => {
    onChangeBackgroundColor(bodyBackgroundColor); // Pass body background color to parent
    onChangeBoxBackgroundColor(boxBackgroundColor); // Pass box background color to parent
    onChangeButtonBackgroundColor(buttonBackgroundColor); // Pass button background color to parent
    closePopup(); // Close the popup
  };

  return (
    <>
      <button onClick={openPopup} className="open-popup-button"   style={{position: 'absolute', right: '45.2%',}}> 
        Open UI Customization
      </button>

      {isPopupOpen && (
        <div className="ui-custom-popup">
          <div className="ui-custom-popup-content">
            <h2>Customize Your UI</h2>
            {/* Body Background Color */}
            <div className="customization-option">
              <label htmlFor="body-background-color">Body Background Color:</label>
              <input
                type="color"
                id="body-background-color"
                value={bodyBackgroundColor}
                onChange={(e) => setBodyBackgroundColor(e.target.value)}
              />
            </div>

            {/* Box Background Color */}
            <div className="customization-option">
              <label htmlFor="box-background-color">Box Background Color:</label>
              <input
                type="color"
                id="box-background-color"
                value={boxBackgroundColor}
                onChange={(e) => setBoxBackgroundColor(e.target.value)}
              />
            </div>

            {/* Button Background Color */}
            <div className="customization-option">
              <label htmlFor="button-background-color">Button Background Color:</label>
              <input
                type="color"
                id="button-background-color"
                value={buttonBackgroundColor}
                onChange={(e) => setButtonBackgroundColor(e.target.value)}
              />
            </div>

            {/* Popup Buttons */}
            <div className="popup-buttons">
              <button className="apply-button" onClick={applyChanges}>
                Apply Changes
              </button>
              <button className="close-button" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UICustomPopup;