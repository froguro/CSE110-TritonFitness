import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import VideoDemonstrations from './VideoDemonstrations/VideoDemonstrations';
import { User } from './types/user';
import SignUp from './SignUp/SignUp';
import UICustomPopup from './uiCustomFolder/ui_custom';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

function App() {
  const [user, setUser] = useState<User | null>(null);
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

  const handleBackgroundColorChange = (color: string) => {
    setBodyBackgroundColor(color);
    localStorage.setItem('bodyBackgroundColor', color);
  };

  const handleBoxColorChange = (color: string) => {
    setBoxBackgroundColor(color);
    localStorage.setItem('boxBackgroundColor', color);
  };

  const handleButtonColorChange = (color: string) => {
    setButtonBackgroundColor(color);
    localStorage.setItem('buttonBackgroundColor', color);
  };

  const handleSignIn = (userData: User) => {
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
            <div>
              <HomePage user={user} onSignIn={handleSignIn}
                backgroundColor={bodyBackgroundColor}
                boxBackgroundColor={boxBackgroundColor}
                buttonBackgroundColor={buttonBackgroundColor}
              />
              <UICustomPopup
                onChangeBackgroundColor={setBodyBackgroundColor}
                onChangeBoxBackgroundColor={setBoxBackgroundColor}
                onChangeButtonBackgroundColor={setButtonBackgroundColor}
              />
            </div>} 
          />
          <Route 
            path="/video-demonstrations" 
            element={<VideoDemonstrations buttonBackgroundColor={buttonBackgroundColor} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp />} 
          />
        </Routes>

      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;