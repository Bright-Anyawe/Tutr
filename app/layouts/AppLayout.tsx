import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import Sidebar from './sideBar';
import '../styles/mainContent.css';

const AppLayout: React.FC = () => {
  const { isSidebarExpanded } = useAuth();
  const location = useLocation();
  
  // Check if we're in studio mode
  const isStudioMode = location.pathname === '/studio-mode';

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <Sidebar />
        </div>
        <main className={`main-area ${isSidebarExpanded ? 'sidebar-expanded' : ''} ${isStudioMode ? 'studio-mode' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;