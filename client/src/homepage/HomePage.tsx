import React from 'react';
import { Link } from 'react-router-dom';
import homepageboxicon from "./homepage-box-icon.svg";
import threelinedropdown from './three-line-dropdown.svg';
import profileplaceholder from './profileplaceholder.svg';
import LoginPopUp from '../LoginPopUpFolder/LoginPopUp';
import { User } from '../types/user';
import './HomePage.css';
import DailyChallenges from '../Daily_Challenges/Daily_challenges';
import EmotionTracker from '../emotionsTrackerFolder/emotionsTracker';
import ExerciseRecommendations from '../exerciseRecommendations/exerciseRecommendations';
import MetricsPage from '../metricsPage/metricsPage';

interface HomePageProps {
  user: User | null;
  onSignIn: (userData: User) => void;
  backgroundColor: string; // Dynamic body background color
  boxBackgroundColor: string; // Dynamic box background color
  buttonBackgroundColor: string; // Dynamic button background color
}

const HomePage: React.FC<HomePageProps> = ({ 
    user, onSignIn, backgroundColor, boxBackgroundColor, buttonBackgroundColor }) => {
    return (
        <div className="homepage" style={{ backgroundColor }}>
            <div className="homepage-header">
                <img src={threelinedropdown} alt="menu" /> 
                <h1>Home</h1>
                <div className="homepage-profile-section">
                    {user ? (
                        <img 
                            src={user.picture || profileplaceholder} 
                            alt={user.name} 
                            className="homepage-profile-image"
                        />
                    ) : (
                        <LoginPopUp onSignIn={onSignIn} />
                    )}
                </div>
            </div>
            <div className="homepage-horizontal-line"></div>
            <div className="homepage-section-list">
                <div className="homepage-box" style={{ backgroundColor: boxBackgroundColor }}>
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
                        <MetricsPage buttonBackgroundColor={buttonBackgroundColor}/>
                    </div>
                </div>

                <div className="homepage-box" style={{ backgroundColor: boxBackgroundColor }}>
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
                        <DailyChallenges buttonBackgroundColor={buttonBackgroundColor} />
                    </div>
                </div>
                <div className="homepage-box" style={{ backgroundColor: boxBackgroundColor }}>
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
                        <Link to="/video-demonstrations">
                        <button className="homepage-section-box-button" style={{ backgroundColor: buttonBackgroundColor }}>Watch Now</button>
                        </Link>
                    </div>
                </div>
                <div className="homepage-box" style={{ backgroundColor: boxBackgroundColor }}>
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
                        <EmotionTracker buttonBackgroundColor={buttonBackgroundColor} />
                    </div>
                </div>
                <div className="homepage-box" style={{ backgroundColor: boxBackgroundColor }}>
                    <div className="homepage-box-icon">
                        <img src={homepageboxicon} />
                    </div>
                    <div className="homepage-box-container">
                        <div className="homepage-section-box-content">
                            <h2>Exercise Recommendations</h2>
                            <p>Description. Lorem ipsum odor amet, consectetuer adipiscing elit. 
                            </p>
                        </div>
                        <ExerciseRecommendations buttonBackgroundColor={buttonBackgroundColor}/>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default HomePage;