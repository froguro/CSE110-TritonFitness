import React, { useState, useEffect } from 'react';
import './ui_custom.css';

interface UICustomPopupProps {
  onChangeBackgroundColor: (color: string) => void;
  onChangeBoxBackgroundColor: (color: string) => void; 
  onChangeButtonBackgroundColor: (color: string) => void;
}

const UICustomPopup: React.FC<UICustomPopupProps> = ({
  onChangeBackgroundColor,
  onChangeBoxBackgroundColor,
  onChangeButtonBackgroundColor,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  const [bodyBackgroundColor, setBodyBackgroundColor] = useState('#ffffff');
  const [boxBackgroundColor, setBoxBackgroundColor] = useState('#ffffff');
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#e0e0e0');

  useEffect(() => {
    const savedBodyColor = localStorage.getItem('bodyBackgroundColor') || '#ffffff';
    const savedBoxColor = localStorage.getItem('boxBackgroundColor') || '#ffffff';
    const savedButtonColor = localStorage.getItem('buttonBackgroundColor') || '#e0e0e0';

    setBodyBackgroundColor(savedBodyColor);
    setBoxBackgroundColor(savedBoxColor);
    setButtonBackgroundColor(savedButtonColor);
  }, []);

  const openPopup = () => setIsPopupOpen(true); 
  const closePopup = () => setIsPopupOpen(false); 

  const applyChanges = () => {
    localStorage.setItem('bodyBackgroundColor', bodyBackgroundColor);
    localStorage.setItem('boxBackgroundColor', boxBackgroundColor);
    localStorage.setItem('buttonBackgroundColor', buttonBackgroundColor);

    onChangeBackgroundColor(bodyBackgroundColor);
    onChangeBoxBackgroundColor(boxBackgroundColor);
    onChangeButtonBackgroundColor(buttonBackgroundColor);

    closePopup();
  };

  return (
    <>
      <button
        onClick={openPopup}
        className="open-popup-button"
        style={{ position: 'absolute', right: '45.2%' }}
      >
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