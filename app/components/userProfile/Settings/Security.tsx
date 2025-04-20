import React, { useState } from 'react';
import '../../../styles/userProfile/Settings.css'; // Assuming dedicated CSS

const Security: React.FC = () => {
  // State for Email
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('sergio@example.com'); // Example email
  const [newEmail, setNewEmail] = useState('sergio@example.com');

  // State for Password
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- Email Handlers ---
  const handleNewEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const saveEmail = () => {
    // Add validation if needed
    setCurrentEmail(newEmail);
    setIsEditingEmail(false);
    console.log('Saving new email:', newEmail);
    // TODO: API call to update email
  };

  const cancelEditEmail = () => {
    setNewEmail(currentEmail);
    setIsEditingEmail(false);
  };

  // --- Password Handlers ---
  const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const savePassword = () => {
    // Add validation (e.g., match, complexity)
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log('Updating password...');
    setIsEditingPassword(false);
    // Clear fields after attempted save
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // TODO: API call to update password (passing currentPassword and newPassword)
  };

  const cancelEditPassword = () => {
    setIsEditingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="security-settings-container">
      {/* Email Section */}
      <div className="setting-section email-section">
        <label className="setting-label">Email Address</label>
        <div className="setting-controls">
          {isEditingEmail ? (
            <div className="edit-controls">
              <input
                type="email"
                value={newEmail}
                onChange={handleNewEmailChange}
                className="setting-input"
                placeholder="New email address"
              />
              <button onClick={saveEmail} className="setting-button save">Save</button>
              <button onClick={cancelEditEmail} className="setting-button cancel">Cancel</button>
            </div>
          ) : (
            <div className="display-controls">
              <span className="setting-value">{currentEmail}</span>
              <button onClick={() => setIsEditingEmail(true)} className="setting-button change">Change</button>
            </div>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div className="setting-section password-section">
        <label className="setting-label">Password</label>
        <div className="setting-controls">
          {isEditingPassword ? (
            <div className="edit-controls vertical">
              <input
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className="setting-input"
                placeholder="Current password"
              />
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="setting-input"
                placeholder="New password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="setting-input"
                placeholder="Confirm new password"
              />
              <div className="button-group">
                 <button onClick={savePassword} className="setting-button save">Save Password</button>
                 <button onClick={cancelEditPassword} className="setting-button cancel">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="display-controls">
              <span className="setting-value">**********</span> {/* Placeholder */} 
              <button onClick={() => setIsEditingPassword(true)} className="setting-button change">Change</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security; 