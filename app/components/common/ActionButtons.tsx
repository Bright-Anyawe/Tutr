import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UploadButton: React.FC = () => {
  return (
    <button 
      type="button" 
      className="upload-button"
      aria-label="Upload Notes"
    >
      <span className="button-icon">
        <img 
          src="/Icons/plusIcon.png" 
          alt="" 
          aria-hidden="true"
        />
      </span>
      <span className="button-text">Upload Notes</span>
    </button>
  );
};

export const StudioButton: React.FC = () => {
  const navigate = useNavigate();

  const handleStudioClick = () => {
    navigate('/studio');
  };

  return (
    <button 
      type="button" 
      className="studio-button"
      aria-label="Open Studio"
      onClick={handleStudioClick}
    >
      <span className="button-icon">
        <img 
          src="/Icons/videoIcon.png" 
          alt="" 
          aria-hidden="true"
        />
      </span>
      <span className="button-text">Open Studio</span>
    </button>
  );
}; 