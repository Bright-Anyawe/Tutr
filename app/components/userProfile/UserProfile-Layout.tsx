import React from 'react';
import type { ReactNode } from 'react';
import BreadcrumbNav from '../BreadcrumbNav/BreadcrumbNav';
import Header from '~/layouts/Header';
import CourseHeader from '~/components/CourseHeader';
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
    { label: currentPage, path: `/${currentPage.toLowerCase()}`, isActive: true }
  ];

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
      
      {/* Main content area */}
      <div className="user-profile-content">
        {/* Main content will be rendered here */}
        {children}
      </div>
    </div>
  );
};

export default UserProfileLayout; 