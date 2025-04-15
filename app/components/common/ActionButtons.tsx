import React from 'react';
import { Upload, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/common/actionButtons.module.css';

export const UploadButton: React.FC = () => {
  return (
    <button className={`${styles.actionButton} ${styles.uploadButton}`}>
      <Upload className={styles.buttonIcon} />
      <span className={styles.buttonText}>Upload Notes</span>
    </button>
  );
};

export const StudioButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      className={`${styles.actionButton} ${styles.studioButton}`}
      onClick={() => navigate('/studio')}
    >
      <Mic className={styles.buttonIcon} />
      <span className={styles.buttonText}>Open Studio</span>
    </button>
  );
}; 