import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Menu.css';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="menu-container" ref={menuRef}>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/my-lessons">My lessons</Link>
        </li>
        <li className="menu-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="menu-item">
          <Link to="/analytics">Analytics</Link>
        </li>
        <li className="menu-item">
          <Link to="/settings">Settings</Link>
        </li>
        <li className="menu-item logout">
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu; 