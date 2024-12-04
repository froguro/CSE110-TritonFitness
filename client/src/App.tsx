import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import { User } from './types/user';
import UICustomPopup from './uiCustomFolder/ui_custom';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [bodyBackgroundColor, setBodyBackgroundColor] = useState('#ffffff');
  const [boxBackgroundColor, setBoxBackgroundColor] = useState('#ffffff');
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#e0e0e0');

  const handleSignIn = (userData: User) => {
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App" style={{ backgroundColor: bodyBackgroundColor }}>
        <HomePage
          user={user}
          onSignIn={handleSignIn}
          backgroundColor={bodyBackgroundColor}
          boxBackgroundColor={boxBackgroundColor}
          buttonBackgroundColor={buttonBackgroundColor}
        />
        <UICustomPopup
          onChangeBackgroundColor={setBodyBackgroundColor}
          onChangeBoxBackgroundColor={setBoxBackgroundColor}
          onChangeButtonBackgroundColor={setButtonBackgroundColor}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;



