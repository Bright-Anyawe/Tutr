import React from 'react';
import StudioView from '../components/studio/StudioView';
import { useNavigate } from 'react-router-dom';
import '../styles/studio/studio-mode.css';

const StudioModePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };
  
  return (
    <div className="studio-mode-container">
      <StudioView onClose={handleClose} />
    </div>
  );
};

export default StudioModePage; 