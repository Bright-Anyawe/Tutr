import Badge from "../common/Badge";
import styles from "../../styles/auth.module.css";

import { useState } from 'react';
import passwordStyles from '../../styles/passwordLogin.module.css';

interface PasswordLoginProps {
  onPasswordSubmit: (password: string) => void;
}

export const PasswordLogin: React.FC<PasswordLoginProps> = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onPasswordSubmit(password);
    }
  };

  return (
    <div>
      <div className={passwordStyles.separator}>or use password</div>

      <form onSubmit={handlePasswordSubmit}>
        <div className={passwordStyles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="123456"
            className={passwordStyles.passwordInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={passwordStyles.eyeIcon}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            👁
          </button>
        </div>
        <button 
          type="submit" 
          className={passwordStyles.loginButton}
          disabled={!password.trim()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export const AuthFooter = () => {
    return (
        <div><div className={styles.footer}>
        <Badge />
        <span className={styles.poweredBy}>Powered by Really AI</span>
      </div></div>
    )
}
