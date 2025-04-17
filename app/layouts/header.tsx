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
  const [isNewSignup, setIsNewSignup] = useState(false);

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
    setIsNewSignup(true); // Mark as new signup
  };

  const handleLogout = () => {
    logout();
    setIsNewSignup(false); // Reset signup state
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <img
          className="logo"
          src="/Icons/Logo.png"
          alt="Company Logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        
        {isLoggedIn || isNewSignup ? (
          // Authenticated header for logged-in users or new signups
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
