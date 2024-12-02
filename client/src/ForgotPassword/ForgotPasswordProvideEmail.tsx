import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordProvideEmail.css';

const ForgotPasswordProvideEmail = () => {
    return (
        <div className="forgot-password-provide-email-container">
            <div className="forgot-password-header">Forgot Password?</div>
            <p>Enter the email associated with your account, and we'll send you a 
                6 digit code <br /> which you will be prompted to enter on the next
                screen to verify your identity.
            </p>
            <div className="forgot-password-provide-email-input">
                <input
                    type="email"
                />
            </div>
            <Link to="/forgot-password-enter-code">
                <button className="forgot-password-confirm-button">Confirm</button>
            </Link>
        </div>
    );
}

export default ForgotPasswordProvideEmail;