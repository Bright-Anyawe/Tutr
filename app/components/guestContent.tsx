import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import Badge from "./common/Badge";
import "../styles/mainContent.css";
import { UploadButton, StudioButton } from './common/ActionButtons';

function GuestContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, userName } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState("Like Uber Eats Meet Tutoring");
  const location = useLocation();
  
  // Check if coming from onboarding with welcomeUser flag
  const showWelcome = location.state?.welcomeUser;

  useEffect(() => {
    if (userName) {
      if (showWelcome) {
        // Special welcome for users just completing onboarding
        setWelcomeMessage(`Welcome  ${userName}!`);
      } else {
        // Regular welcome for returning users
        setWelcomeMessage(`Welcome back, ${userName}`);
      }
    } else {
      setWelcomeMessage("Like Uber Eats Meet Tutoring");
    }
  }, [userName, showWelcome]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="guest-page">
      <div className="content">
        <Badge />
        <h1 className="title">{welcomeMessage}</h1>
        
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
              <UploadButton />
              <StudioButton />
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

export default GuestContent;
