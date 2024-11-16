import React, { useState } from 'react';
import tritonFitnessLogo from './tritonFitnessLogo.svg';
import tritonFitnessTitle from './tritonFitnessTitle.svg';
import { ReactComponent as EyeOn } from './eyeOn.svg';
import { ReactComponent as EyeOff } from './eyeOff.svg';
import googleIcon from './signUpGoogleIcon.svg';
import './SignUp.css';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="signup-container">
            <div className="signup-logo-container">
                <img src={tritonFitnessLogo} />
                <img src={tritonFitnessTitle} />
            </div>
            <div className="signup-form">
                <div className="signup-input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div className="signup-input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                </div>
                <div className="signup-input-group">
                    <div className="signup-password-group">
                        <label htmlFor="password">Password</label>
                        <div className="signup-forgot-password">Forgot Password?</div>
                    </div>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                        />
                        <span className="signup-eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff /> : <EyeOn />}
                        </span>
                    </div>
                </div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-input-container">
                        <input 
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                        />
                        <span className="signup-eye-icon" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <EyeOff /> : <EyeOn />}
                        </span>
                    </div>
            

                <button className="signup-button">Sign Up</button>
                <div className="signup-login-link">
                    <span>Already have an account? Sign In</span>
                </div>
                <div className="signup-divider">
                    <span>Or</span>
                </div>
                <button className="google-signup-button">
                    <div className="google-icon">
                        <img src={googleIcon} className="google-icon-img" />
                        Sign Up With Google
                    </div>
                </button>
            </div>
        </div>
    );
}

export default SignUp;