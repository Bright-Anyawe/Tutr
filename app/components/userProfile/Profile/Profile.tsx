import React from 'react';
import '../../../styles/userProfile/Profile.css'; // Dedicated CSS for Profile page
import '../../../styles/userProfile/ProfileContentSections.css'; // Import CSS for content sections
import '../../../styles/userProfile/ProfileDetailsSections.css'; // Import CSS for details sections
import AccountSettings from './AccountSettings'; // Import the sidebar component
import ProfileContentSections from './ProfileContentSections'; // Import the new sections
import ProfileDetailsSections from './ProfileDetailsSections'; // Import the new details sections component

const Profile: React.FC = () => {
  // Example data - replace with actual user data
  const preferredName = 'Sergio Ramos';
  const email = 'e.g sergioramos@4.com';

  const handleNavigateToSettings = (section: string) => {
    // Placeholder navigation logic - implement actual navigation
    console.log(`Navigate to Settings -> ${section}`);
    // Example using react-router-dom (ensure navigate is obtained via useNavigate):
    // navigate(`/settings#${section.toLowerCase()}`); 
  };

  return (
    <>
      {/* Profile Page Sidebar (using AccountSettings component) */}
      <div className="profile-sidebar-container">
        <AccountSettings />
      </div>

      {/* Profile Content Panel */}
      <div className="profile-content-panel">
        <h1 className="profile-main-title">Profile</h1>

        {/* Account Section Preview */}
        <section className="profile-section account-section">
          <div className="profile-avatar-container">
             <img
               src="/Images/avater.png"
               alt="User Avatar"
               className="profile-avatar"
             />
          </div>
          <div className="profile-name-section">
             <label htmlFor="preferredNameInput" className="profile-info-label">Preferred Name</label>
             <div className="profile-input-group">
               <input
                 type="text"
                 id="preferredNameInput"
                 className="profile-name-input"
                 placeholder="e.g. Sergio Ramos"
               />
               <button
                 onClick={() => handleNavigateToSettings('Account')}
                 className="profile-change-button"
               >
                 Change name
               </button>
             </div>
          </div>
        </section>

        {/* Security Section Preview */}
        <section className="profile-section security-section">
          <h2 className="profile-section-title">Security</h2>
          <div className="profile-detail-row email-row">
             <div className="profile-info-group">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value">{email}</span>
             </div>
             <button
               onClick={() => handleNavigateToSettings('Security')}
               className="profile-change-button"
             >
               Change email
             </button>
          </div>
          <div className="profile-detail-row password-row">
             <div className="profile-info-group">
                <span className="profile-info-label">Password</span>
                <span className="profile-info-description">Set a personal password to log in to your account</span>
             </div>
             <button
               onClick={() => handleNavigateToSettings('Security')}
               className="profile-change-button"
             >
               Change Password
             </button>
          </div>
        </section>

        {/* Additional Content Sections (Subjects, Videos) */}
        <ProfileContentSections /> 

        {/* Details Sections (Experience, Availability, etc.) */}
        <ProfileDetailsSections />

      </div>
    </>
  );
};

export default Profile;
