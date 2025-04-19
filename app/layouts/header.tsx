import "../styles/header.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/Headers/DashboardHeader';
import SignUpHeaderActions from '../components/Headers/SignUpHeaderActions';
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

  // Check localStorage for auth state on every render
  useEffect(() => {
    const checkAuthState = () => {
      const storedLoginType = localStorage.getItem('userLoginType');
      if (storedLoginType === 'signup') {
        setUserLoginType('signup');
        setIsNewSignup(true);
      } else if (storedLoginType === 'login') {
        setUserLoginType('login');
      }
    };

    checkAuthState();
    
    // Add event listener to detect localStorage changes from other components
    window.addEventListener('storage', checkAuthState);
    return () => window.removeEventListener('storage', checkAuthState);
  }, []);

  // Update userLoginType when login status changes
  useEffect(() => {
    if (isLoggedIn) {
      const storedLoginType = localStorage.getItem('userLoginType');
      
      if (storedLoginType === 'signup') {
        setUserLoginType('signup');
        setIsNewSignup(true);
      } else {
        setUserLoginType('login');
      }
    } else if (!isLoggedIn) {
      setUserLoginType(null);
      setIsNewSignup(false);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    navigate('/auth', { state: { isLogin: true } });
  };

  const handleSignup = () => {
    localStorage.setItem('userLoginType', 'signup');
    setUserLoginType('signup');
    setIsNewSignup(true);
    navigate('/auth', { state: { isLogin: false } });
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userLoginType');
    setUserLoginType(null);
    setIsNewSignup(false);
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
        
        {!isLoggedIn && !userLoginType ? (
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
          <SignUpHeaderActions 
            userName="New User" 
            onLogout={handleLogout}
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
