import React from 'react';
import '../../../styles/userProfile/ProfileContentSections.css'; // Dedicated CSS

// Placeholder data - replace with actual data
const subjectsData = [
  { main: 'Mathematics', sub: 'Calculus' },
  { main: 'Computer Science', sub: 'Programming' },
];

const ProfileContentSections: React.FC = () => {

  const handleSubjectChange = (subject: string) => {
    console.log(`Change requested for ${subject}`);
    // Add logic to handle subject/topic change (e.g., open modal)
  };

  const handleVideoChange = (videoType: 'Intro' | 'Demo') => {
    console.log(`Change requested for ${videoType} video`);
    // Add logic to handle video change (e.g., open file picker or modal)
  };

  return (
    <div className="profile-content-sections-container">

      {/* Subjects/Topics Section */}
      <section className="profile-content-section subjects-section">
        <h3 className="pfc-section-title">Subjects / Topics</h3>
        <div className="subjects-list">
          {subjectsData.map((item, index) => (
            <div key={index} className="subject-item">
              <div className="subject-info">
                <span className="subject-main">{item.main}</span>
                <span className="subject-sub">{item.sub}</span>
              </div>
              <button 
                onClick={() => handleSubjectChange(item.main)}
                className="pfc-change-button"
              >
                Change
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="profile-content-section video-section">
        <div className="video-header">
           <h3 className="pfc-section-title">Intro Video</h3>
           <button 
             onClick={() => handleVideoChange('Intro')}
             className="pfc-change-button"
           >
             Change
           </button>
        </div>
        <div className="video-placeholder">
            <img src="/Images/play.png" alt="Play icon" className="play-icon-placeholder" />
        </div>
      </section>

      {/* Demo Lesson Section */}
      <section className="profile-content-section video-section">
         <div className="video-header">
            <h3 className="pfc-section-title">Demo Lesson</h3>
            <button 
              onClick={() => handleVideoChange('Demo')}
              className="pfc-change-button"
            >
              Change
            </button>
          </div>
        <div className="video-placeholder">
            <img src="/Images/play.png" alt="Play icon" className="play-icon-placeholder" />
        </div>
      </section>

    </div>
  );
};

export default ProfileContentSections; 