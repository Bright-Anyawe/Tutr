import "../styles/header.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeaderActions from '../components/Headers/headerActions'; // Restored import with corrected casing
import DashboardHeader from '../components/Headers/dashboardHeader'; // Corrected casing
import AuthenticatedActions from '../components/Headers/AuthenticatedActions';
import UnauthenticatedActions from '../components/Headers/UnauthenticatedActions';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isNewSignup, setIsNewSignup] = useState(false);
  const [userLoginType, setUserLoginType] = useState<'login' | 'signup' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update userLoginType when login status changes
  useEffect(() => {
    if (isLoggedIn && userLoginType !== 'signup') {
      setUserLoginType('login');
    } else if (!isLoggedIn) {
      setUserLoginType(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedLoginType = localStorage.getItem('userLoginType');
    if (storedLoginType === 'signup' || storedLoginType === 'login') {
      localStorage.removeItem('userLoginType');
      setUserLoginType(null);
    }
  }, []);

  const handleLogin = () => {
    navigate('/auth', { state: { isLogin: true } });
  };

  const handleSignup = () => {
    navigate('/auth', { state: { isLogin: false } });
    setUserLoginType('signup');
    setIsNewSignup(true); // Keep for backwards compatibility
  };

  const handleLogout = () => {
    logout();
    setUserLoginType(null);
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
        
        {!userLoginType ? (
          // Unauthenticated header for guests
          <UnauthenticatedActions 
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        ) : userLoginType === 'login' ? (
          // Authenticated header for logged-in users
          <DashboardHeader 
            isMenuOpen={isMenuOpen}
            isMobile={isMobile}
            onLogout={handleLogout}
          />
        ) : (
          // Authenticated actions for new signups
          <AuthenticatedActions userName="New User" />
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
