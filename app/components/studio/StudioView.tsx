import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/studio/StudioView.css';
import PieChart from './PieChart';
import StudioButtons from './studioButtons';

interface StudioViewProps {
  onClose?: () => void;
}

const StudioView: React.FC<StudioViewProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudioMode = location.pathname === '/studio-mode';
  
  const handleFullscreenClick = () => {
    if (!isStudioMode) {
      navigate('/studio-mode');
    }
  };
  
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  const handleCreateLesson = () => {
    console.log('Create lesson clicked');
    // Implementation for creating a lesson
  };
  
  const handleReset = () => {
    console.log('Reset all clicked');
    // Implementation for resetting
  };
  
  const handleScribble = () => {
    console.log('Scribble clicked');
    // Implementation for scribble functionality
  };
  
  return (
    <div className="studio-container">
      {/* Header */}
      <div className="studio-header">
        <div className="studio-title">
          <span className="studio-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.66667C5.39752 1.66667 1.66669 5.3975 1.66669 10C1.66669 14.6025 5.39752 18.3333 10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 10C18.3334 5.3975 14.6025 1.66667 10 1.66667ZM10 16.6667C6.31835 16.6667 3.33335 13.6817 3.33335 10C3.33335 6.31834 6.31835 3.33334 10 3.33334C13.6817 3.33334 16.6667 6.31834 16.6667 10C16.6667 13.6817 13.6817 16.6667 10 16.6667ZM7.50002 6.66667L13.75 10L7.50002 13.3333V6.66667Z" fill="white"/>
            </svg>
          </span>
          Studio
        </div>
        <div className="studio-controls">
          <button 
            className="control-button fullscreen-button"
            onClick={handleFullscreenClick}
            style={{ display: isStudioMode ? 'none' : 'flex' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.33333 2.66667H2.66667V5.33333H4V4H5.33333V2.66667ZM2.66667 10.6667H4V12H5.33333V13.3333H2.66667V10.6667ZM12 12H10.6667V13.3333H13.3333V10.6667H12V12ZM10.6667 4H12V5.33333H13.3333V2.66667H10.6667V4Z" fill="white"/>
            </svg>
          </button>
          <button className="control-button close-button" onClick={handleCloseClick}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="studio-content">
        <div className="chart-container">
          <PieChart 
            data={[
              { label: 'Development', value: 30, color: '#FF6384' },
              { label: 'Sales', value: 15, color: '#FF9F40' },
              { label: 'Marketing', value: 25, color: '#FFCD56' },
              { label: 'HR', value: 10, color: '#4BC0C0' },
              { label: 'Support', value: 20, color: '#36A2EB' },
            ]}
          />
        </div>
      </div>
      
      {/* Footer Controls - using SearchForm component */}
      <StudioButtons 
        onCreateLesson={handleCreateLesson}
        onReset={handleReset}
        onScribble={handleScribble}
      />
    </div>
  );
};

export default StudioView; 