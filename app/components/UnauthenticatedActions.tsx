import React from 'react';
import '../styles/AuthStyles.css';

interface UnauthenticatedActionsProps {
  onLogin: () => void;
  onSignup: () => void;
}

const UnauthenticatedActions: React.FC<UnauthenticatedActionsProps> = ({
  onLogin,
  onSignup
}) => {
  return (
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
};

export default UnauthenticatedActions; 