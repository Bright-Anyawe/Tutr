import React from 'react';
import styles from '../styles/login.module.css';

type LoginBoxProps = {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailSubmit: () => void;
};

const LoginBox: React.FC<LoginBoxProps> = ({ email, onEmailChange, onEmailSubmit }) => {
  return (
    <div className={styles.loginBox}>
      <h1 className={styles.title}>Welcome Back</h1>
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
      >
        Continue with email
      </button>
    </div>
  );
};

export default LoginBox;