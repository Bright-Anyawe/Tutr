import "../styles/header.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <>
      <header className="header">
        <img
          className="logo"
          src="/Icons/Logo.png"
          alt="Company Logo"
        />
        <nav className={`header-actions ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
          {(!isMobile || isMenuOpen) && (
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
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <button className="signup-button">
                  Sign Up
                </button>
              </section>
            </>
          )}
        </nav>
        {isMobile && (
          <button 
            className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </header>
    </>
  );    
};

export default Header;
