import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordEnterCode.css';

const ForgotPasswordEnterCode = () => {
    return (
        <div className="forgot-password-enter-code-container">
            <p>Input the code that you received in your email, 
                <br /> and click on the next button.</p>
            <div className="forgot-password-code-input">
                <input
                    type="email"
                />
            </div>
            <Link to="/forgot-password-set-new-password">
                <button className="forgot-password-next-button">Next</button>
            </Link>
        </div>
    );
}

export default ForgotPasswordEnterCode;