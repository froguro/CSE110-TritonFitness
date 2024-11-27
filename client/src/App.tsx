import React from 'react';
import './App.css';
import HomePage from './homepage/HomePage';
import { User } from './types/user';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        <HomePage user={user} onSignIn={handleSignIn} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;



