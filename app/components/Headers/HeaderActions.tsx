import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthenticatedActions from './SignUpHeaderActions';
import UnauthenticatedActions from './UnauthenticatedActions';
import '../../styles/headerActions.css';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  onLogin: () => void;
  onSignup: () => void;
  forceAuthenticatedView?: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isMenuOpen,
  isMobile,
  onLogin,
  onSignup,
  forceAuthenticatedView = false
}) => {
  const { isLoggedIn, userName } = useAuth();

  return (
    <nav className={`header-actions ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
      {/* Render authenticated or unauthenticated actions based on login state or forced view */}
      {(!isMobile || isMenuOpen) && (
        isLoggedIn || forceAuthenticatedView 
          ? <AuthenticatedActions userName={userName ?? undefined} />
          : <UnauthenticatedActions onLogin={onLogin} onSignup={onSignup} />
      )}
    </nav>
  );
};

export default HeaderActions; 