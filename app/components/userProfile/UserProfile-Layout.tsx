import React from 'react';
import type { ReactNode } from 'react';
import BreadcrumbNav from '../BreadcrumbNav/BreadcrumbNav';
import Header from '~/layouts/Header';
import '../../styles/userProfile/UserProfileLayout.css';

interface UserProfileLayoutProps {
  children?: ReactNode;
  currentPage?: string;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ 
  children,
  currentPage = 'Profile'
}) => {
  // Create a custom breadcrumb path based on current page
  const breadcrumbPath = [
    { label: 'Dashboard', path: '/dashboard', isActive: false },
    { label: currentPage, path: `/${currentPage.toLowerCase().replace(/ /g, '-')}`, isActive: true }
  ];

  // Determine content class based on page
  const contentClass = currentPage === 'My Lessons' || currentPage === 'Settings' || currentPage === 'Profile Settings'
                       ? 'user-profile-content-grid' 
                       : 'user-profile-content-full';

  return (
    <div className="user-profile-container">
      {/* First level: Main header */}
      <div className="user-profile-header">
        <Header />
      </div>
      
      {/* Second level: Breadcrumb navigation */}
      <div className="user-profile-breadcrumb">
        <BreadcrumbNav customPath={breadcrumbPath} />
      </div>
      
      {/* Main content area with conditional class */}
      <div className={contentClass}>
        {/* Main content will be rendered here */}
        {children}
      </div>
    </div>
  );
};

export default UserProfileLayout; 