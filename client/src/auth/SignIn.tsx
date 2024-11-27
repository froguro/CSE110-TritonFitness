import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './SignIn.css';

interface SignInProps {
  onSignIn: (userId: number) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google response:', credentialResponse); // Debug log
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log('Decoded token:', decoded); // Debug log
      
      const response = await fetch('http://localhost:3001/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: decoded.email,
          googleId: decoded.sub,
          name: decoded.name,
          picture: decoded.picture,
        }),
      });

      const data = await response.json();
      console.log('Server response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in with Google');
      }

      onSignIn(data.userId);
    } catch (err) {
      console.error('Sign in error:', err); // Debug log
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="google-signin-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Sign In Failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn; 