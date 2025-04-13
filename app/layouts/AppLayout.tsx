import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import Sidebar from './sideBar';
import GuestPage from '../routes/guestPage';
import '../styles/mainContent.css';

const AppLayout: React.FC = () => {
  const { isSidebarExpanded, isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className={`main-area ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
          {location.pathname === '/' && !isLoggedIn ? (
            <GuestPage />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;