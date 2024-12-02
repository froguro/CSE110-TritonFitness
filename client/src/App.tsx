import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import HomePage from './homepage/HomePage';
import VideoDemonstrations from './VideoDemonstrations/VideoDemonstrations';
import ForgotPassword from './ForgotPassword/ForgotPasswordProvideEmail';
import ForgotPasswordEnterCode from './ForgotPassword/ForgotPasswordEnterCode';
import ForgotPasswordSetNewPassword from './ForgotPassword/ForgotPasswordSetNewPassword';
import ForgotPasswordConfirmation from './ForgotPassword/ForgotPasswordConfirmation';
import { User } from './types/user';

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
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />
          <Route 
            path="/forgot-password-enter-code" 
            element={<ForgotPasswordEnterCode />} 
          />
          <Route 
            path="/forgot-password-set-new-password" 
            element={<ForgotPasswordSetNewPassword />} 
          />
          <Route 
            path="/forgot-password-confirmation" 
            element={<ForgotPasswordConfirmation />} 
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;