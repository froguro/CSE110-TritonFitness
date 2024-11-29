import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import VideoDemonstrations from './VideoDemonstrations/VideoDemonstrations';
import { User } from './types/user';
import SignUp from './SignUp/SignUp';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = (userData: User) => {
    setUser(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage user={user} onSignIn={handleSignIn} />} 
          />
          <Route 
            path="/video-demonstrations" 
            element={<VideoDemonstrations />} 
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