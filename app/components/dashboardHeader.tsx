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
        <div className="user-profile-container">
          <div className="premium-badge">Premium</div>
          <div className="user-profile" onClick={toggleDropdown}>
            <div className="profile-image-placeholder">
              {userName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="user-name">{userName}</span>
            <span className="dropdown-arrow">▼</span>
            
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
        </div>
      )}
    </div>
  );
};

export default DashboardHeader; 