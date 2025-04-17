import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/dashboardHeader.css';

interface DashboardHeaderProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isMenuOpen,
  isMobile,
  onLogout
}) => {
  const { userName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`dashboard-header ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
      {(!isMobile || isMenuOpen) && (
        <>
          <button className="connect-button">
            Connect to Collabor8
          </button>
          
          <button className="pro-button">
            Pro
          </button>
          
          <div className="notification-button">
            <div className="notification-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white"/>
              </svg>
            </div>
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-profile" onClick={toggleDropdown}>
          <span className="dropdown-arrow">▼</span>

            <img 
              src="/Images/profile-avatar.png" 
              alt="User profile" 
              className="profile-image"
              onError={(e) => {
                // If image fails to load, show placeholder
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
                  <li className="profile-dropdown-item logout" onClick={onLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHeader; 