import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Badge from "../components/badge";
import "../styles/mainContent.css";

function GuestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="guest-page">
      <div className="content">
        <Badge />
        <h1 className="title">Like Uber Eats Meet Tutoring</h1>
        
        <form 
          className="search-container" 
          onSubmit={handleSearchSubmit}
          role="search"
        >
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
              <button 
                type="button" 
                className="studio-button"
                aria-label="Open Studio"
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
    </section>
  );
}

export default GuestPage;
