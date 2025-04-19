import React, { useState } from 'react';
import styles from '../../../styles/userProfile/accountSettings.module.css'; // Import the CSS module

interface AccountSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
  // Optional: receive current path from parent if routing is handled outside
  // currentPath?: string; 
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ 
  isOpen = true, 
  onClose 
  // currentPath 
}) => {
  // State to track the active item, initialized to '/account'
  const [activePath, setActivePath] = useState<string>('/account');

  // If currentPath is provided as a prop, use it instead of local state
  // useEffect(() => {
  //   if (currentPath) {
  //     setActivePath(currentPath);
  //   }
  // }, [currentPath]);

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

  // Handler to update active path on click
  // In a real app, this might navigate using react-router or similar
  const handleItemClick = (path: string) => {
    setActivePath(path);
    // Add navigation logic here if needed, e.g., navigate(path);
    // console.log("Navigating to:", path);
  };

  return (
    // Use container class from CSS module
    <div className={styles.container}> 
      {/* Use list class */}
      <ul className={styles.list}>
        {menuItems.map((item) => (
          // Use item class
          <li key={item.path} className={styles.item}>
            {/* Use link class and conditionally add active class */}
            {/* Using button for semantics if it doesn't navigate via href */}
            <button 
              className={`${styles.link} ${item.path === activePath ? styles.active : ''}`}
              onClick={() => handleItemClick(item.path)}
            >
              {item.name}
            </button>
            {/* Alternative if using actual links: */}
            {/* <a 
              href={item.path} 
              className={`${styles.link} ${item.path === activePath ? styles.active : ''}`}
              onClick={(e) => {
                // Prevent default if handling navigation via JS
                // e.preventDefault(); 
                handleItemClick(item.path);
              }}
            >
              {item.name}
            </a> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSettings; 