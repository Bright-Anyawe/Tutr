import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/verifyEmail.module.css';
import PasswordLogin from './PasswordLogin';

interface VerifyEmailProps {
  email: string;
  onVerify: (code: string) => void;
  onPasswordLogin: (password: string) => void;
  isLogin?: boolean;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ 
  email, 
  onVerify, 
  onPasswordLogin,
  isLogin = true
}) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
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

      // If all digits are filled, verify
      if (newCode.every(digit => digit !== '') && !isVerifying) {
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
    setIsVerifying(true);
    
    // Simulate verification delay and show success state
    setTimeout(() => {
      // Mark verification as successful
      setVerificationSuccess(true);
      
      // Wait a moment to show the success state before navigating
      setTimeout(() => {
        // Submit verification code
        onVerify(verificationCode);
        
        // Login the user with their email
        login(email);
        
        // Navigate based on whether user is signing up or logging in
        if (isLogin) {
          // Send existing users to homepage/dashboard
          navigate('/');
        } else {
          // Send new users to onboarding
          navigate('/onboarding');
        }
      }, 1000);
    }, 800);
  };

  const handlePasswordLogin = (password: string) => {
    // Submit password for login
    onPasswordLogin(password);
    
    // Login the user with their email
    login(email);
    
    // Navigate to the main app page (root path)
    navigate('/');
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
              className={`
                ${styles.codeInput} 
                ${index === activeInput && !verificationSuccess ? styles.active : ''} 
                ${verificationSuccess ? styles.success : ''}
              `}
              onFocus={() => setActiveInput(index)}
              disabled={verificationSuccess || isVerifying}
            />
          ))}
        </div>

        {isLogin && !verificationSuccess && <PasswordLogin onPasswordSubmit={handlePasswordLogin} />}
        
        {verificationSuccess && (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <p>{isLogin ? 'Login successful!' : 'Account created successfully!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
