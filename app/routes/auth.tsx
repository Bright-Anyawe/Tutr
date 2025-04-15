// src/components/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/auth.module.css';
import AuthBox from '../components/authBox';
import VerifyEmail from '../components/verifyEmail';
import Badge from '../components/badge';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    
    // Login the user and redirect to the app root page
    login(email);
    navigate('/');
  };

  const handlePasswordLogin = (password: string) => {
    // Here you would typically verify the password with your backend
    console.log('Login with password:', password);
    
    // Login the user and redirect to the app root page
    login(email);
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
        />
      ) : (
        <AuthBox 
          email={email} 
          onEmailChange={handleEmailChange} 
          onEmailSubmit={handleEmailSubmit} 
        />
      )}

      <div className={styles.bottomContent}>
        <p className={styles.description}>
          tutr is a tutor's workspace built with tools that assist making
          students' learning visual.
        </p>
        <div className={styles.footer}>
          <Badge />
          <span className={styles.poweredBy}>Powered by Really AI</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;