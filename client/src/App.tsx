import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import { User } from './types/user';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;
import SignUp from './SignUp/SignUp';
import VideoDemonstrations from './VideoDemonstrations/VideoDemonstrations';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = (userData: User) => {
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        <HomePage user={user} onSignIn={handleSignIn} />
      </div>
    </GoogleOAuthProvider>
    <VideoDemonstrations />
    
  );
}

export default App;