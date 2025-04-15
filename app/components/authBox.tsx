import React, { useState, useEffect } from 'react';
import styles from '../styles/authBox.module.css';

interface AuthBoxProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailSubmit: () => void;
}

const AuthBox: React.FC<AuthBoxProps> = ({ email, onEmailChange, onEmailSubmit }) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // Check if email is valid whenever it changes
  useEffect(() => {
    setIsEmailValid(email.trim().length > 0);
  }, [email]);

  const handleAuthTypeChange = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.loginBox}>
      <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
      <button className={`${styles.button} ${styles.googleButton}`}>
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