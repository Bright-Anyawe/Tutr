import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../../styles/Menu.css';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void; // Optional custom logout handler
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, onLogout }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
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
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onLogout) {
      // Use the custom logout handler if provided
      onLogout();
    } else {
      // Otherwise use the default logout behavior
      logout();
      localStorage.removeItem("userLoginType");
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
    
    onClose();
  };
  
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
          <a href="#" onClick={handleLogout}>Log Out</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu; 