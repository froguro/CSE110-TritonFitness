import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordConfirmation.css';

const ForgotPasswordConfirmation = () => {
    return (
        <div className="forgot-password-confirmation-container">
            <h1>Your password has been successfully updated.</h1>
            <Link to="/">
                <button className="forgot-password-homepage-button">Return to Homepage</button>
            </Link>
        </div>
    );
}

export default ForgotPasswordConfirmation;