// src/components/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = () => {
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>tutr</div>
      
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <button className={`${styles.button} ${styles.googleButton}`}>
          Continue with google
        </button>
        <div className={styles.separator}>or</div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="name@email.edu"
          className={styles.input}
        />
        <button 
          className={`${styles.button} ${styles.emailButton}`}
          onClick={handleEmailSubmit}
        >
          Continue with email
        </button>
      </div>

      <div>
        <p className={styles.description}>
          tutr is a tutor's workspace built with tools that assist making
          students' learning visual.
        </p>
        <div className={styles.footer}>
          <span className={styles.reallyAiBadge}>Really AI</span>
          <span className={styles.poweredBy}>Powered by Really AI</span>
        </div>
      </div>
    </div>
  );
};

export default Login;