import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import Sidebar from './sideBar';

const FocusTrap = React.lazy(() => import('focus-trap-react'));

const AppLayout: React.FC = () => {
  const { isLoggedIn, isSidebarExpanded } = useAuth();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Reset scroll position and close sidebar on route change
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300); // Match transition duration
    return () => clearTimeout(timer);
  }, [isSidebarExpanded]);

  useEffect(() => {
    if (!isSidebarExpanded && lastFocusedElement.current) {
      lastFocusedElement.current.focus();
      lastFocusedElement.current = null;
    }
  }, [isSidebarExpanded]);

  const handleSidebarOpen = () => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
  };

  return (
    <div className="app-container">
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite"
      >
        {isSidebarExpanded ? 'Sidebar opened' : 'Sidebar closed'}
      </div>
      <Header />
      {isLoggedIn && (
        <Suspense fallback={null}>
          <FocusTrap
            active={isSidebarExpanded}
            focusTrapOptions={{
              onActivate: handleSidebarOpen,
              allowOutsideClick: true,
              initialFocus: false,
              clickOutsideDeactivates: true,
            }}
          >
            <div>
              <Sidebar />
            </div>
          </FocusTrap>
        </Suspense>
      )}
      <div 
        ref={mainContentRef}
        className={`layout-wrapper ${isSidebarExpanded ? 'sidebar-visible' : ''} ${isTransitioning ? 'transitioning' : ''}`}
        aria-hidden={isSidebarExpanded}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;