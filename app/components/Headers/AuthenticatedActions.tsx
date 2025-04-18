import React, { useState } from 'react';
import '../../styles/AuthStyles.css';

interface AuthenticatedActionsProps {
  userName?: string;
}

const AuthenticatedActions: React.FC<AuthenticatedActionsProps> = ({
  userName = 'User'
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <section className="authenticated-actions">
      <div className="premium-profile-container">
        <span className="premium-label">Premium</span>
        <div className="user-avatar-container" onClick={toggleDropdown}>
          <img 
            src="/Images/profile-avatar.png" 
            alt="User profile" 
            className="profile-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className = 'profile-image-placeholder';
                placeholder.innerText = userName?.charAt(0).toUpperCase() || 'U';
                parent.appendChild(placeholder);
              }
            }}
          />
          <span className="dropdown-arrow">▼</span>
        </div>
        
        {showDropdown && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-header">
              <span className="profile-name">{userName}</span>
              <span className="profile-email">user@example.com</span>
            </div>
            <div className="profile-dropdown-divider"></div>
            <ul className="profile-dropdown-menu">
              <li className="profile-dropdown-item">Profile</li>
              <li className="profile-dropdown-item">Settings</li>
              <li className="profile-dropdown-item">Help Center</li>
              <li className="profile-dropdown-item logout">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthenticatedActions; 