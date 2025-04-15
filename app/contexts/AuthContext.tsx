import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  isSidebarExpanded: boolean;
  login: (username: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  toggleSidebar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const loginWithGoogle = () => {
    // In a real app, this would integrate with Google OAuth
    setIsLoggedIn(true);
    setUserName("Google User"); // This would normally come from the Google profile
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setIsSidebarExpanded(false);
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