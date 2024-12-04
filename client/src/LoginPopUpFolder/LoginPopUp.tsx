import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/user';
import './LoginPopUp.css';
import { Link } from 'react-router-dom';
import { ReactComponent as EyeOn } from '../SignUp/eyeOn.svg';
import { ReactComponent as EyeOff } from '../SignUp/eyeOff.svg';

interface LoginPopUpProps {
  onSignIn: (userData: User) => void;
}

interface LoginPopUpProps {
  buttonBackgroundColor: string; // Add prop for button background color
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ onSignIn , buttonBackgroundColor }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      onSignIn({
        id: data.userId,
        email: email,
        name: data.name || email.split('@')[0],
        picture: data.picture || '',
      });
      
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      
      console.log('Decoded Google data:', decoded);
      
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in with Google');
      }

      onSignIn({
        id: data.userId,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture || data.picture
      });
      
      setIsModalOpen(false);
    } catch (err) {
      console.error('Google login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="open-modal-button" style={{ backgroundColor: buttonBackgroundColor }}>Log In</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="close-modal-button">✖</button>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Value"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Value"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="toggle-password-visibility"
                  >
                    {passwordVisible ? <EyeOn />  :  <EyeOff />}
                  </button>
                </div>
              </div>
              <div className="forgot-link">
                <a href="/forgot">Forgot?</a>
              </div>
              <button type="submit" className="sign-in-button">Sign In</button>
              <div className="google-signin-container">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Sign In Failed')}
                />
              </div>
              <div className="create-account-link">
                <span>Don't have an account? </span>
                <Link to="/signup">Create An Account</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopUp;
