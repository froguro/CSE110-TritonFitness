import React from 'react';
import './profile.css';
import profilePlaceholder from '../homepage/profileplaceholder.svg';
import { User } from '../types/user';
import UICustomPopup from '../uiCustomFolder/ui_custom';
import { Link } from 'react-router-dom';

interface ProfileProps {
  user: User | null;
  onChangeBackgroundColor: (color: string) => void;
  onChangeBoxBackgroundColor: (color: string) => void;
  onChangeButtonBackgroundColor: (color: string) => void;
  backgroundColor: string;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  onChangeBackgroundColor,
  onChangeBoxBackgroundColor,
  onChangeButtonBackgroundColor,
  backgroundColor,
}) => {
  if (!user) {
    return <p className="no-user-message">No user data available. Please log in.</p>;
  }

  const Points = 1000;
  const Streak = 15;

  return (
    <div className="profile-container" style={{ backgroundColor }}>
      {/* User Avatar */}
      <div className="profile-avatar">
        <img
          src={user.picture || profilePlaceholder}
          alt="Profile Avatar"
          className="avatar-image"
          onError={(e) => {
            e.currentTarget.src = profilePlaceholder;
          }}
        />
      </div>

      {/* User Info */}
      <div className="profile-info">
        <h2>
          {user.name} {user.id && `#${user.id}`}
        </h2>
        <p>Email: {user.email || 'N/A'}</p>
        <p>Points: {Points}</p>
        <p>Streak: {Streak} days</p>
      </div>

      {/* User Actions */}
      <div className="profile-actions">
        <button className="profile-button settings-button">⚙️ User Settings (Not Functional)</button>
        {/* <button className="profile-button customize-button">✏️ Customize</button> */}
        <button className="profile-button streak-button">✅ Share Your Streak (Not Functional)</button>
      </div>

      {/* UI Customization */}
      <div>
        <UICustomPopup
          onChangeBackgroundColor={onChangeBackgroundColor}
          onChangeBoxBackgroundColor={onChangeBoxBackgroundColor}
          onChangeButtonBackgroundColor={onChangeButtonBackgroundColor}
        />
      </div>

      {/* Back to Home Button */}
      <div className="profile-back-home">
        <Link to="/">
          <button className="profile-button home-button">🏠 Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;