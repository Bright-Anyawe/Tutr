import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/headerActions.css';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogin: () => void;
  onSignup: () => void;
  forceAuthenticatedView?: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isMenuOpen,
  isMobile,
  onLogin,
  onSignup,
  forceAuthenticatedView = false
}) => {
  const { isLoggedIn, userName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderAuthenticatedActions = () => (
    <>
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
    </>
  );

  // Unauthenticated actions rendering
  const renderUnauthenticatedActions = () => (
    <>
      <section className="trial-banner">
        <p className="trial-text">
          <span className="trial-highlight">
            You are on free trial.
          </span>{" "}
          <a href="#upgrade" className="trial-upgrade">
            Upgrade
          </a>
        </p>
      </section>
      <section className="auth-buttons">
        <button 
          className="login-button"
          onClick={onLogin}
        >
          Log In
        </button>
        <button 
          className="signup-button"
          onClick={onSignup}
        >
          Sign Up
        </button>
      </section>
    </>
  );

  return (
    <nav className={`header-actions ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
      {/* Render authenticated or unauthenticated actions based on login state or forced view */}
      {(!isMobile || isMenuOpen) && (
        isLoggedIn || forceAuthenticatedView ? renderAuthenticatedActions() : renderUnauthenticatedActions()
      )}
    </nav>
  );
};

export default HeaderActions; 