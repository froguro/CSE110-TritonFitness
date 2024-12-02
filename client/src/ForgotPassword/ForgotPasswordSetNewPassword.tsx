import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EyeOn } from './eyeOn.svg';
import { ReactComponent as EyeOff } from './eyeOff.svg';
import './ForgotPasswordSetNewPassword.css';

const ForgotPasswordSetNewPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

    return (
        <div className="forgot-password-set-new-password-container">
            <div className="set-new-password-input-container">
                <label htmlFor="newPassword">New Password</label>
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                />
                <span className="new-password-eye-icon" onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? <EyeOff /> : <EyeOn />}
                </span>
            </div>
            <div className="set-new-password-input-container">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input 
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    id="confirmNewPassword"
                />
                <span className="new-password-eye-icon" onClick={toggleConfirmNewPasswordVisibility}>
                    {showConfirmNewPassword ? <EyeOff /> : <EyeOn />}
                </span>
            </div>
            <Link to='/forgot-password-confirmation'>
                <button className="forgot-password-update-button">Update</button>
            </Link>
        </div>
    );
}

export default ForgotPasswordSetNewPassword;