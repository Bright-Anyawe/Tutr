import { useState } from 'react';
import styles from '../styles/passwordLogin.module.css';

interface PasswordLoginProps {
  onPasswordSubmit: (password: string) => void;
}

const PasswordLogin: React.FC<PasswordLoginProps> = ({ onPasswordSubmit }) => {
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
      <div className={styles.separator}>or use password</div>

      <form onSubmit={handlePasswordSubmit}>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="123456"
            className={styles.passwordInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            👁
          </button>
        </div>
        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={!password.trim()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default PasswordLogin;   
