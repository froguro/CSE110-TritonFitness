import React, { useState } from 'react';
import './LoginPopUp.css'; // Changed to style.css

const LoginPopUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setIsModalOpen(false); // Close the modal after submission
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">Log In</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="close-modal-button">✖</button>
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
                    {passwordVisible ? 'No' : 'Yes'}
                  </button>
                </div>
              </div>
              <div className="forgot-link">
                <a href="/forgot">Forgot?</a>
              </div>
              <button type="submit" className="sign-in-button">Sign In</button>
              <div className="create-account-link">
                <span>Don't have an account? </span>
                <a href="/create-account">Create An Account</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopUp;
