import React from 'react';
import '../../styles/studio/StudioHeader.css'; // We will create this CSS file next

interface StudioHeaderProps {
  onExpandClick?: () => void;
  onCloseClick?: () => void;
  // Add any other props needed, e.g., dynamic title
}

const StudioHeader: React.FC<StudioHeaderProps> = ({
  onExpandClick,
  onCloseClick
}) => {
  return (
    <div className="studio-header">
      <div className="studio-title-section">
        <img src="/Images/studioIcon.png" alt="" />
        <span className="studio-title-text">Studio</span>
      </div>
      <div className="studio-controls-section">
        <button
          className="control-button expand-button"
          onClick={onExpandClick}
          aria-label="Expand"
        >
          {/* SVG for Expand Icon */}
           <img src="/Images/expandIcon.png" alt="Expand image" />
        </button>
        <button
          className="control-button close-button"
          onClick={onCloseClick}
          aria-label="Close"
        >
          {/* SVG for Close Icon */}
         <img src="/Images/closeIcon.png" alt="Close image" />
        </button>
      </div>
    </div>
  );
};

export default StudioHeader; 