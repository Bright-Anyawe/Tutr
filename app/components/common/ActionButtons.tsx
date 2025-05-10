import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/common/actionButtons.module.css';

interface ActionButtonProps {
  className?: string;
}

export const UploadButton: React.FC<ActionButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/upload');
  };
  
  return (
    <button 
      className={`${styles.actionButton} ${styles.uploadButton} ${className || ''}`}
      onClick={handleClick}
      aria-label="Upload Notes"
    >
            <img src="/Icons/plusIcon.png" alt="Plus Icon" />

      <span>Upload Notes</span>
    </button>
  );
};

export const StudioButton: React.FC<ActionButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleOpenStudio = () => {
    // We're going to push state to indicate that studio is open
    // rather than use a modal
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Instead of managing modal state locally, we redirect to a "virtual path"
    // which will be intercepted to show the studio content while keeping the header
    navigate('/studio', { 
      state: { 
        isStudioMode: true,
        returnPath: window.location.pathname
      } 
    });
  };
  
  return (
    <button 
      className={`${styles.actionButton} ${styles.studioButton} ${className || ''}`}
      onClick={handleOpenStudio}
      aria-label="Open Studio"
    >
      <img src="/Images/studioIcon.png" alt="Studio Icon" />
      <span>Open Studio</span>
    </button>
  );
};

export const SearchButton: React.FC<ActionButtonProps & { searchQuery?: string }> = ({ className, searchQuery = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate('/search');    
  };

  return (
    <button 
              type="submit" 
              className="search-button"
              aria-label="Search"
              disabled={!searchQuery.trim()}
            >
              <img 
                src="/Icons/exportIcon.png" 
                alt="" 
                aria-hidden="true"
              />
            </button>
  );
};


export default { UploadButton, StudioButton, SearchButton }; 