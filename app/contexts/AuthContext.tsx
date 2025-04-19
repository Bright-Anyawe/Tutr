import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  isSidebarExpanded: boolean;
  login: (email: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  toggleSidebar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedLoginType = localStorage.getItem('userLoginType');
    if (storedLoginType === 'login' || storedLoginType === 'signup') {
      setIsLoggedIn(true);
      
      // Try to get stored username if available
      const storedUsername = localStorage.getItem('userName');
      if (storedUsername) {
        setUserName(storedUsername);
      } else {
        setUserName(storedLoginType === 'signup' ? 'New User' : 'User');
      }
    }
  }, []);

  const login = (email: string) => {
    setIsLoggedIn(true);
    
    // Extract username from email (part before @)
    const username = email.split('@')[0];
    
    // Capitalize first letter of username
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    
    // Save username to localStorage
    localStorage.setItem('userName', formattedUsername);
    
    setUserName(formattedUsername);
  };

  const loginWithGoogle = () => {
    // In a real app, this would integrate with Google OAuth
    setIsLoggedIn(true);
    const googleUsername = "Google User"; // This would normally come from the Google profile
    
    // Save username to localStorage
    localStorage.setItem('userName', googleUsername);
    
    setUserName(googleUsername);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setIsSidebarExpanded(false);
    
    // Clear user data from localStorage
    localStorage.removeItem('userLoginType');
    localStorage.removeItem('userName');
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userName, 
      isSidebarExpanded,
      login, 
      loginWithGoogle,
      logout,
      toggleSidebar 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}