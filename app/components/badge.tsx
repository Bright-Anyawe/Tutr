import React from 'react';
import "../styles/mainContent.css";

interface BadgeProps {
  text?: string;
}

const Badge: React.FC<BadgeProps> = ({ text = "Heally AI" }) => {
  return (
    <div className="badge">
      <div className="badge-content">
        <img 
          src="/Icons/aiIcon.png" 
          alt=""
          className="badge-icon"
          aria-hidden="true"
        />
        <span className="badge-text">Heally AI</span>
      </div>
    </div>
  );
};

export default Badge;
