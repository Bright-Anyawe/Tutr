import React, { useState } from 'react';
import '../styles/lessonsRequests.css';

const LessonsRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bestMatches' | 'recent' | 'saved'>('bestMatches');

  const handleTabClick = (tab: 'bestMatches' | 'recent' | 'saved') => {
    setActiveTab(tab);
  };

  return (
    <div className="lessons-requests-container">
      <h1 className="lessons-requests-title">Lessons Requests</h1>
      
      <div className="lessons-requests-tabs">
        <button 
          className={`tab-button ${activeTab === 'bestMatches' ? 'active' : ''}`}
          onClick={() => handleTabClick('bestMatches')}
        >
          Best Matches
        </button>
        <button 
          className={`tab-button ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => handleTabClick('recent')}
        >
          Recent
        </button>
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => handleTabClick('saved')}
        >
          saved
        </button>
      </div>
      
      <div className="lessons-requests-content">
        {/* Content will be displayed based on the active tab */}
        {activeTab === 'bestMatches' && (
          <div className="tab-content best-matches-content">
            {/* Best Matches content goes here */}
          </div>
        )}
        
        {activeTab === 'recent' && (
          <div className="tab-content recent-content">
            {/* Recent content goes here */}
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="tab-content saved-content">
            {/* Saved content goes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsRequests; 