import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/dashboardHeader.css';
import Menu from './Menu/Menu';

interface DashboardHeaderProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isMenuOpen,
  isMobile,
  onLogout
}) => {
  const { userName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log("Toggle dropdown:", !showDropdown); // Log for debugging
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`dashboard-header ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
      {(!isMobile || isMenuOpen) && (
        <>
          <button className="connect-button">
            Connect to Collabor8
          </button>
          
          <button className="pro-button">
            Pro
          </button>
          
          <div className="notification-button">
            <div className="notification-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white"/>
              </svg>
            </div>
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-profile" style={{ position: 'relative' }} onClick={toggleMenu}>
            <img 
              src="/Images/avater.png" 
              alt="User profile" 
              className="profile-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const placeholder = document.createElement('div');
                  placeholder.className = 'profile-image-placeholder';
                  placeholder.innerText = userName?.charAt(0).toUpperCase() || 'U';
                  parent.appendChild(placeholder);
                }
              }}
            />
            {showMenu ? (
              <img src="/Images/arrow-up.png" alt="" />
            ) : (
              <img src="/Images/arrow-down.png" alt="" />
            )}
          </div>
          <Menu isOpen={showMenu} onClose={() => setShowMenu(false)} />
        </>
      )}
    </div>
  );
};

export default DashboardHeader;