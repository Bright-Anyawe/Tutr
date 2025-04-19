import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/onboarding.module.css';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = useAuth();
  
  const totalSteps = 3;
  const userEmail = location.state?.email || '';
  
  useEffect(() => {
    // If we don't have user data and we're not coming from auth, redirect to auth
    if (!userName && !userEmail) {
      navigate('/auth');
    }
  }, [userName, userEmail, navigate]);
  
  const handleContinue = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete - update localStorage to indicate user is now logged in
      localStorage.setItem('userLoginType', 'login');
      
      // Navigate to homepage
      navigate('/', { 
        state: { 
          onboardingComplete: true,
          welcomeUser: true
        } 
      });
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h1 className={styles.title}>Welcome to Tutr{userName ? `, ${userName}` : ''}</h1>
            <div className={styles.placeholderArea}></div>
            <p className={styles.description}>
              Create, share, and learn with Tutr's AI-powered education platform. 
              Let's get you started with a quick tour of what we offer.
            </p>
          </>
        );
      case 1:
        return (
          <>
            <h1 className={styles.title}>Create Engaging Content</h1>
            <div className={styles.placeholderArea}></div>
            <p className={styles.description}>
              Use our Open Studio to create engaging lessons with text, videos, quizzes, 
              and interactive elements - all with the help of AI.
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h1 className={styles.title}>Share Knowledge Effortlessly</h1>
            <div className={styles.placeholderArea}></div>
            <p className={styles.description}>
              Your account is now ready. Start exploring all the features Tutr has to offer.
            </p>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Tutr</div>
      </header>
      
      <main className={styles.content}>
        {renderStep()}
        
        <div className={styles.progressIndicator}>
          {[...Array(totalSteps)].map((_, index) => (
            <div 
              key={index} 
              className={`${styles.progressDot} ${index === currentStep ? styles.active : ''}`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>
        
        <button className={styles.continueButton} onClick={handleContinue}>
          {currentStep < totalSteps - 1 ? 'Continue' : 'Get Started'}
        </button>
      </main>
      
      <footer className={styles.footer}>
        <p className={styles.poweredBy}>Powered by Tutr AI</p>
      </footer>
    </div>
  );
};

export default OnboardingPage; 