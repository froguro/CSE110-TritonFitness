import React, { useState } from 'react';
import homepageboxicon from "./homepage-box-icon.svg";
import threelinedropdown from './three-line-dropdown.svg';
import profileplaceholder from './profileplaceholder.svg';
import LoginPopUp from '../LoginPopUpFolder/LoginPopUp';
import { User } from '../types/user';
import EmotionsTracker from '../emotionsTrackerFolder/emotionsTracker';
import DailyChallenges from '../Daily_Challenges/Daily_challenges';
import './HomePage.css';

interface HomePageProps {
  user: User | null;
  onSignIn: (userData: User) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onSignIn }) => {
const HomePage = () => { 
    return (
        <div className="homepage">
            <div className="homepage-header">
                <img src={threelinedropdown} alt="menu" /> 
                <h1>Home</h1>
                <div className="profile-section">
                    {user ? (
                        <img 
                            src={user.picture || profileplaceholder} 
                            alt={user.name} 
                            className="profile-image"
                        />
                    ) : (
                        <LoginPopUp onSignIn={onSignIn} />
                    )}
                </div>
            </div>
            <div className="homepage-horizontal-line"></div>
            <div className="homepage-section-list">
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Record Your Matrix</h2>
                            <p>Record your fitness metrics to monitor your strengths and track
                                the progression of your physical abilities.
                            </p>
                        </div>
                        <button className="homepage-section-box-button">Record Now</button>
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Daily Challenges</h2>
                            <p>Complete daily challenges to boost your athletic growth and alleviate
                                your stress. You can earn points by completing daily challenges that
                                can be redeemed for customizing your profile. Daily challenges can 
                                also be used for recovering a lost streak if you miss a workout.
                            </p>
                        </div>
                        <DailyChallenges />
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Watch Video Demonstrations</h2>
                            <p>View video demonstrations to learn how to perform
                                exercises correctly and safely. On this page, you will
                                be provided with options to navigate between categories of videos,
                                provide feedback on videos, like or dislike videos, and share/save videos.
                            </p>
                        </div>
                            <button className="homepage-section-box-button">Watch Now</button>
                    </div>
                </div>
                <div className="homepage-box">
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Emotions Tracker</h2>
                            <p>Select tags that describe your emotions today(happy, sad, anxious, etc.)
                                to log your emotions for the day. This information will be stored so that you
                                can view the history of your mood patterns. 
                            </p>
                        </div>
                        <button className="homepage-section-box-button">Log Emotions</button>
                    </div>
                </div>
            </div>       
        </div>
    );
    
}

export default HomePage;