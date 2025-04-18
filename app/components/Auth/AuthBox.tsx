import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/authBox.module.css';

interface AuthBoxProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailSubmit: () => void;
  isLogin?: boolean; // Make it optional with default value
}

const AuthBox: React.FC<AuthBoxProps> = ({ 
  email, 
  onEmailChange, 
  onEmailSubmit,
  isLogin: initialIsLogin = true // Default to login mode if not provided
}) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  // Update internal state when prop changes
  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);
  
  // Check if email is valid whenever it changes
  useEffect(() => {
    setIsEmailValid(email.trim().length > 0);
  }, [email]);

  const handleAuthTypeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    if (isLogin) {
      localStorage.setItem('userLoginType', 'login');
    } else {
      localStorage.setItem('userLoginType', 'signup');
    }
    navigate('/');
  };

  return (
    <div className={styles.loginBox}>
      <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
      <button 
        className={`${styles.button} ${styles.googleButton}`}
        onClick={handleGoogleLogin}
      >
        Continue with google
      </button>
      
      <div className={styles.separator}>or</div>
      
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="name@email.edu"
        className={styles.input}
      />
      
      <button 
        className={`${styles.button} ${styles.emailButton}`}
        onClick={onEmailSubmit}
        disabled={!isEmailValid}
      >
        Continue with email
      </button>
    </div>
  );
};

export default AuthBox;