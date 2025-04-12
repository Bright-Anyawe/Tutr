import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from "../layouts/header";
import Sidebar from "../layouts/sideBar";
import Badge from "../components/badge";
import "../styles/mainContent.css";

const Dashboard: React.FC = () => {
  const { isLoggedIn, userName, isSidebarExpanded } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className={`layout-wrapper ${isSidebarExpanded ? 'sidebar-visible' : ''}`}>
        <Sidebar />
        <main className="main-content" role="main">
          <div className="content">
            <Badge />
            <h1 className="welcome-title">Welcome {userName}</h1>
            
            <form className="search-container" onSubmit={handleSearchSubmit}>
              <div className="search-input">
                <input
                  type="text"
                  className="search-field"
                  placeholder="What do you want to teach today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search teaching topics"
                />
              </div>

              <div className="search-actions">
                <div className="action-buttons">
                  <button type="button" className="action-button">
                    <span className="button-icon">
                      <img src="/Icons/exportIcon.png" alt="" aria-hidden="true" />
                    </span>
                    Upload Notes
                  </button>
                  <button type="button" className="action-button">
                    <span className="button-icon">
                      <img src="/Icons/videoIcon.png" alt="" aria-hidden="true" />
                    </span>
                    Open Studio
                  </button>
                </div>

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
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;