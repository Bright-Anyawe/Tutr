import React from 'react';
import './AccountSettings.css';

interface AccountSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ isOpen = true, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { name: 'Account', path: '/account' },
    { name: 'Security', path: '/security' },
    { name: 'Subjects/Topics', path: '/subjects' },
    { name: 'Intro Video', path: '/intro-video' },
    { name: 'Demo Lesson', path: '/demo-lesson' },
    { name: 'Experience Level', path: '/experience' },
    { name: 'Availability', path: '/availability' },
    { name: 'Jobs Completed', path: '/jobs-completed' },
    { name: 'Student Ratings And Badges', path: '/ratings' },
    { name: 'Languages Spoken', path: '/languages' },
  ];

  return (
    <div className="account-settings-container">
      <ul className="account-settings-list">
        {menuItems.map((item, index) => (
          <li key={index} className="account-settings-item">
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSettings; 