import React from 'react';
import './Profile.css';
import profilePlaceholder from '../homepage/profileplaceholder.svg'; // Use a placeholder image for avatars

const Profile = () => {
  // Example user data
  const user = {
    name: 'Group 23',
    id: '#1234',
    points: 9999,
    streak: 9999,
    picture: '', // Add a valid image URL here or leave blank for placeholder
  };

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img
          src={user.picture || profilePlaceholder}
          alt="Profile Avatar"
          className="avatar-image"
        />
      </div>
      <div className="profile-info">
        <h2>{user.name} {user.id}</h2>
        <p>Points: {user.points}</p>
        <p>streaks: {user.streak}</p>
      </div>
      <div className="profile-actions">
        <button className="profile-button settings-button">⚙️ User Settings</button>
        <button className="profile-button customize-button">✏️ Customize</button>
        <button className="profile-button streak-button">✅ Share Your Streak</button>
      </div>
    </div>
  );
};

export default Profile;