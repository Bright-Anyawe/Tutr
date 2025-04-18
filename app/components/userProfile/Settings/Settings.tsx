import React, { useState } from 'react';
import '../../../styles/userProfile/Settings.css'; // Use shared layout styles
import Security from './Security';
const Settings: React.FC = () => {
  const [activeSetting, setActiveSetting] = useState('Account');
  const [preferredName, setPreferredName] = useState('Sergio Ramos'); // Example initial value
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('Sergio Ramos');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const saveName = () => {
    setPreferredName(newName);
    setIsEditingName(false);
    // Here you would typically call an API to save the name
    console.log('Saving new name:', newName);
  };

  const cancelEdit = () => {
    setNewName(preferredName); // Reset input to original name
    setIsEditingName(false);
  };

  return (
    <>
      {/* Settings Sidebar */}
      <div className="settings-sidebar">
        <div 
          className={`sidebar-item ${activeSetting === 'Account' ? 'active' : ''}`}
          onClick={() => setActiveSetting('Account')}
        >
          <span>Account</span>
        </div>
        <div 
          className={`sidebar-item ${activeSetting === 'Security' ? 'active' : ''}`}
          onClick={() => setActiveSetting('Security')}
        >
          <span>Security</span>
        </div>
        {/* Add other settings sections as needed */}
      </div>

      {/* Settings Content Panel */}
      <div className="settings-content-panel">
        {activeSetting === 'Account' && (
          <>
            <div className="settings-header">
              <h1>Settings</h1>
              <h2>Account</h2>
            </div>
            <div className="account-details">
              <img 
                src="/Images/avater.png" // Assuming this path based on image
                alt="User Avatar"
                className="settings-avatar"
              />
              <div className="settings-name-section">
                <label htmlFor="preferredName" className="settings-name-label">Preferred Name</label>
                {isEditingName ? (
                  <div className="edit-name-controls">
                    <input 
                      type="text"
                      id="preferredName"
                      value={newName}
                      onChange={handleNameChange}
                      className="settings-name-input editing"
                      placeholder="e.g. Sergio Ramos"
                    />
                    <button onClick={saveName} className="settings-name-button save">Save</button>
                    <button onClick={cancelEdit} className="settings-name-button cancel">Cancel</button>
                  </div>
                ) : (
                  <div className="display-name-controls">
                    <span className="settings-name-display">{preferredName}</span>
                    <button onClick={() => setIsEditingName(true)} className="settings-name-button change">Change name</button>
                  </div>
                )}
              </div>
              {/* Add other account settings here */}
            </div>
          </>
        )}
        {activeSetting === 'Security' && (
          <>
            <div className="settings-header">
              <h1>Settings</h1>
              <h2>Security</h2>
            </div>
            <div>
              {/* Security settings content goes here */}
              <Security />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;