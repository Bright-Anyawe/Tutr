import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/dashboardHeader.css';
import Menu from '../Menu';
import NotificationDropdown from '../Notification/NotificationDropdown';

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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log("Toggle dropdown:", !showDropdown); // Log for debugging
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  // Placeholder data - replace with actual data fetching later
  const placeholderNotifications = [
    { id: '1', type: 'general' as const, imageUrl: '/Images/Samuel.png', text: 'Samuel has requested for your tutoring service', timestamp: '3 min ago' },
    { id: '2', type: 'general' as const, imageUrl: '/Images/Samuel.png', text: 'Another general notification', timestamp: '1 hour ago' },
    { id: '3', type: 'general' as const, imageUrl: '/Images/Samuel.png', text: 'Third general notification', timestamp: '5 hours ago' },
    { id: '4', type: 'request' as const, imageUrl: '/Images/Samuel.png', text: 'New tutoring request from Jane', timestamp: '2 min ago' },
    { id: '5', type: 'request' as const, imageUrl: '/Images/Samuel.png', text: 'Request details updated for John', timestamp: '30 min ago' },
  ];

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
          
          <div className="notification-button" onClick={toggleNotifications}>
            <div className="notification-icon">
              <img src="/Images/bell.png" alt="bell" />
            </div>
            <span className="notification-badge">
              {placeholderNotifications.filter(n => n.type === 'general').length + placeholderNotifications.filter(n => n.type === 'request').length}
            </span>
          </div>
          
          {isNotificationOpen && (
            <NotificationDropdown
              notifications={placeholderNotifications}
              onNotificationClick={(id) => console.log('Clicked notification:', id)}
              onSeePrevious={() => console.log('Clicked see previous')}
              onClose={closeNotifications}
            />
          )}

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
          <Menu 
            isOpen={showMenu} 
            onClose={() => setShowMenu(false)} 
            onLogout={onLogout}
          />
        </>
      )}
    </div>
  );
};

export default DashboardHeader;