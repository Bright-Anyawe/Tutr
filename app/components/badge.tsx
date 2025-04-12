import React from 'react';
import "../styles/mainContent.css";

const Badge: React.FC = () => {
  return (
    <div className="badge">
      <div className="badge-content">
        <img 
          src="/Icons/aiIcon.png" 
          alt="AI Icon" 
          className="badge-icon"
        />
        <span className="badge-text">Heally AI</span>
      </div>
    </div>
  );
};

export default Badge;
