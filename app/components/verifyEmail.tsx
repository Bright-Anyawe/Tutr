import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/verifyEmail.module.css';

interface VerifyEmailProps {
  email: string;
  onVerify: (code: string) => void;
  onPasswordLogin: (password: string) => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onVerify, onPasswordLogin }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Focus the first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value !== '' && index < 4) {
        inputRefs.current[index + 1]?.focus();
        setActiveInput(index + 1);
      }

      // If all digits are filled, verify and navigate
      if (newCode.every(digit => digit !== '')) {
        handleVerification(newCode.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const handleVerification = (verificationCode: string) => {
    // Submit verification code
    onVerify(verificationCode);
    
    // Login the user
    login(email);
    
    // Navigate to the main app page (root path)
    navigate('/');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      // Submit password for login
      onPasswordLogin(password);
      
      // Login the user
      login(email);
      
      // Navigate to the main app page (root path)
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Verify Email</h1>
        <p className={styles.subtitle}>
          Kindly enter code or follow link sent to
          <br />
          <span className={styles.email}>{email}</span>
        </p>

        <div className={styles.codeContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleCodeChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className={`${styles.codeInput} ${index === activeInput ? styles.active : ''}`}
              onFocus={() => setActiveInput(index)}
            />
          ))}
        </div>

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
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
