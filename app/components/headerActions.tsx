import React from 'react';
import styles from '../styles/headerActions.module.css';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogin: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isMenuOpen, isMobile, onLogin }) => {
  return (
    <nav className={`${styles.headerActions} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
      {(!isMobile || isMenuOpen) && (
        <>
          <section className={styles.trialBanner}>
            <p className={styles.trialText}>
              <span className={styles.trialHighlight}>
                You are on free trial.
              </span>{" "}
              <a href="#upgrade" className={styles.trialUpgrade}>
                Upgrade
              </a>
            </p>
          </section>
          <section className={styles.authButtons}>
            <button className={styles.loginButton} onClick={onLogin}>
              Log In
            </button>
            <button className={styles.signupButton}>
              Sign Up
            </button>
          </section>
        </>
      )}
    </nav>
  );
};

export default HeaderActions; 