import "../styles/header.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeaderActions from '../components/headerActions';
import DashboardHeader from '../components/dashboardHeader';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    navigate('/auth', { state: { isLogin: true } });
  };

  const handleSignup = () => {
    navigate('/auth', { state: { isLogin: false } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <img
          className="logo"
          src="/Icons/Logo.png"
          alt="Company Logo"
        />
        
        {isLoggedIn ? (
          // Authenticated header for logged-in users
          <DashboardHeader 
            isMenuOpen={isMenuOpen}
            isMobile={isMobile}
            onLogout={handleLogout}
          />
        ) : (
          // Unauthenticated header for guests
          <HeaderActions 
            isMenuOpen={isMenuOpen}
            isMobile={isMobile}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
        
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
