import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import SignIn from './auth/SignIn';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;
console.log('Client ID:', GOOGLE_CLIENT_ID);

function App() {
  const [userId, setUserId] = useState<number | null>(null);

  const handleSignIn = (id: number) => {
    setUserId(id);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        {userId ? (
          <HomePage />
        ) : (
          <SignIn onSignIn={handleSignIn} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;



