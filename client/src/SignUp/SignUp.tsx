import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tritonFitnessLogo from './tritonFitnessLogo.svg';
import tritonFitnessTitle from './tritonFitnessTitle.svg';
import { ReactComponent as EyeOn } from './eyeOn.svg';
import { ReactComponent as EyeOff } from './eyeOff.svg';
import googleIcon from './signUpGoogleIcon.svg';
import './SignUp.css';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to register');
            }

            // Registration successful - redirect to login
            navigate('/');
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-logo-container">
                <img src={tritonFitnessLogo} alt="Triton Fitness Logo" />
                <img src={tritonFitnessTitle} alt="Triton Fitness Title" />
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <div className="signup-input-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="signup-input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="signup-input-group">
                    <div className="signup-password-group">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="signup-eye-icon" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <EyeOff /> : <EyeOn />}
                    </span>
                </div>

                <button type="submit" className="signup-button">Sign Up</button>
                
                <div className="signup-login-link">
                    <Link to="/">Already have an account? Sign In</Link>
                </div>
                
                <div className="signup-divider">
                    <span>Or</span>
                </div>
                
                <button type="button" className="google-signup-button">
                    <div className="google-icon">
                        <img src={googleIcon} className="google-icon-img" alt="Google Icon" />
                        Sign Up With Google
                    </div>
                </button>
            </form>
        </div>
    );
};

export default SignUp;