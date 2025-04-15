import React from 'react';
import styles from '../styles/welcomePopup.module.css';

interface WelcomePopupProps {
  lessonData: {
    course: string;
    topic: string;
    student?: string;
  };
  onClose: () => void;
  onContinue: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ 
  lessonData, 
  onClose,
  onContinue
}) => {
  const { course, topic, student } = lessonData;
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <h2 className={styles.title}>Welcome to your first lesson!</h2>
          
          <div className={styles.lessonDetails}>
            <p className={styles.detailItem}>
              <span className={styles.label}>Course:</span> 
              <span className={styles.value}>{course}</span>
            </p>
            <p className={styles.detailItem}>
              <span className={styles.label}>Topic:</span> 
              <span className={styles.value}>{topic}</span>
            </p>
            {student && (
              <p className={styles.detailItem}>
                <span className={styles.label}>Student:</span> 
                <span className={styles.value}>@{student}</span>
              </p>
            )}
          </div>
          
          <p className={styles.message}>
            You're all set to begin your tutoring journey. Let's make learning visual!
          </p>
          
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.primaryButton} onClick={onContinue}>
              Start Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup; 