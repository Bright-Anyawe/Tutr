// src/components/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/auth.module.css';
import AuthBox from '../components/AuthBox';
import VerifyEmail from '../components/VerifyEmail';
import AuthFooter from '../components/AuthFooter';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get isLogin state from location or default to true (login mode)
  const isLogin = location.state?.isLogin ?? true;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = () => {
    if (email) {
      setIsEmailSubmitted(true);
    }
  };

  const handleVerification = (code: string) => {
    // Here you would typically verify the code with your backend
    console.log('Verification code:', code);
    
    // Login the user
    login(email);
    
    // Navigate based on login vs signup
    if (isLogin) {
      // For logins, go to home/dashboard
      navigate('/');
    } else {
      // For signups, go to onboarding with email
      navigate('/onboarding', { 
        state: { 
          email: email,
          fromSignup: true
        } 
      });
    }
  };

  const handlePasswordLogin = (password: string) => {
    // Here you would typically verify the password with your backend
    console.log('Login with password:', password);
    
    // Login the user and redirect to the app root page
    login(email);
    
    // Password login is only for existing users, so always go to home
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>tutr</div>
      
      {isEmailSubmitted ? (
        <VerifyEmail 
          email={email}
          onVerify={handleVerification}
          onPasswordLogin={handlePasswordLogin}
          isLogin={isLogin}
        />
      ) : (
        <AuthBox 
          email={email} 
          onEmailChange={handleEmailChange} 
          onEmailSubmit={handleEmailSubmit}
          isLogin={isLogin}
        />
      )}

      <div className={styles.bottomContent}>
        <p className={styles.description}>
          tutr is a tutor's workspace built with tools that assist making
          students' learning visual.
        </p>
        <AuthFooter />
      </div>
    </div>
  );
};

export default Auth;