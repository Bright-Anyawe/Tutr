import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/sideBar.css';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar } = useAuth();
  const [activeItem, setActiveItem] = useState<string>('');
  const sidebarRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartXRef.current - currentX;
    if (isSidebarExpanded && diff > 0) {
      setDragOffset(Math.min(diff, 250));
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 125) { // If dragged more than halfway
      toggleSidebar();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarExpanded && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarExpanded) {
        toggleSidebar();
      }
    };

    if (isSidebarExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSidebarExpanded, toggleSidebar]);

  const sidebarStyle = isDragging ? {
    transform: `translateX(-${dragOffset}px)`,
    transition: 'none'
  } : undefined;

  return (
    <>
      {!isSidebarExpanded ? (
        <button 
          className="sidebar-icon"
          onClick={toggleSidebar}
          aria-label="Expand sidebar"
          aria-expanded="false"
        >
          <img 
            src="/Icons/sideBarIcon.png" 
            alt=""
            className="icon-image"
            aria-hidden="true"
          />
        </button>
      ) : (
        <aside 
          ref={sidebarRef}
          className="sidebar expanded" 
          role="complementary"
          aria-label="Main navigation"
          style={sidebarStyle}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            className="close-button"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            aria-expanded="true"
          >
            <span className="close-icon"></span>
          </button>

          <nav className="sidebar-nav">
            <ul className="nav-list" role="menu">
              <li role="none">
                <button 
                  className={`nav-item ${activeItem === 'create' ? 'active' : ''}`}
                  onClick={() => setActiveItem('create')}
                  role="menuitem"
                  aria-current={activeItem === 'create'}
                >
                  <div className="nav-item-icon">
                    <img src="/Icons/plusIcon.png" alt="" aria-hidden="true" />
                  </div>
                  <span className="nav-item-text">Create new lesson</span>
                </button>
              </li>
              <li role="none">
                <button 
                  className={`nav-item ${activeItem === 'chat' ? 'active' : ''}`}
                  onClick={() => setActiveItem('chat')}
                  role="menuitem"
                  aria-current={activeItem === 'chat'}
                >
                  <div className="nav-item-icon">
                    <img src="/Icons/plusIcon.png" alt="" aria-hidden="true" />
                  </div>
                  <span className="nav-item-text">New Chat</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="sidebar-sections">
            <section className="today-section" aria-labelledby="today-heading">
              <h2 id="today-heading">TODAY</h2>
              <div className="section-content" role="region">
                <p>No lessons today</p>
              </div>
            </section>
            
            <section className="lessons-section" aria-labelledby="lessons-heading">
              <h2 id="lessons-heading">MY LESSONS</h2>
              <div className="section-content" role="region">
                <p>No lessons available</p>
              </div>
            </section>
          </div>
        </aside>
      )}
      {isSidebarExpanded && (
        <div 
          className="sidebar-backdrop" 
          onClick={toggleSidebar}
          aria-hidden="true"
          style={{ opacity: isDragging ? 1 - (dragOffset / 250) : undefined }}
        />
      )}
    </>
  );
};

export default Sidebar;
