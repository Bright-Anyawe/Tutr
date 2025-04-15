import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/headerActions.css';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogin: () => void;
  onSignup: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isMenuOpen,
  isMobile,
  onLogin,
  onSignup
}) => {
  const { isLoggedIn, userName } = useAuth();

  const renderAuthenticatedActions = () => (
    <div className="user-profile-container">
      <div className="premium-badge">Premium</div>
      <div className="user-profile">
        <div className="profile-image-placeholder">
          {userName?.charAt(0) || 'U'}
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>
    </div>
  );

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
      {(!isMobile || isMenuOpen) && (
        isLoggedIn ? renderAuthenticatedActions() : renderUnauthenticatedActions()
      )}
    </nav>
  );
};

export default HeaderActions; 