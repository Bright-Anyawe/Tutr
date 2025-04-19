import React from 'react';
import '../../../styles/userProfile/ProfileDetailsSections.css'; // Dedicated CSS

// Placeholder data - replace with actual data
const experienceData = [
  { subject: 'Mathematics', topic: 'Calculus', rate: '$10/hr', level: 'Intermediate' },
  { subject: 'Computer Science', topic: 'Programming', rate: '$20/hr', level: 'Pro' },
];

const availabilityData = [
    { subject: 'Mathematics', topic: 'Calculus', days: 'Mon Wed Fri', time: '1:30pm EST' },
];

const jobsData = [
    { subject: 'Mathematics', topic: 'Calculus', days: 'Mon Wed Fri', time: '1:30pm EST' },
];

const ProfileDetailsSections: React.FC = () => {

  const handleChange = (section: string) => {
    console.log(`Change requested for ${section}`);
    // Add logic to handle change (e.g., open modal)
  };

  return (
    <div className="profile-details-sections-container">

      {/* Experience Level Section */}
      <section className="pds-section experience-section">
        <div className="pds-header">
          <h3 className="pds-title">Experience Level</h3>
          <button onClick={() => handleChange('Experience')} className="pds-change-button">Change</button>
        </div>
        <div className="pds-list experience-list">
          {experienceData.map((item, index) => (
            <div key={index} className="pds-item experience-item">
              <div className="pds-subject-topic">
                <span>{item.subject}</span>
                <span>{item.topic}</span>
              </div>
              <div className="pds-rate-level">
                 <span>{item.rate}</span>
                 <span>{item.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Availability Section */}
      <section className="pds-section availability-section">
         <div className="pds-header">
            <h3 className="pds-title">Availability</h3>
            <button onClick={() => handleChange('Availability')} className="pds-change-button">Change</button>
         </div>
         <div className="pds-list availability-list">
             {availabilityData.map((item, index) => (
                <div key={index} className="pds-item availability-item">
                   <div className="pds-subject-topic">
                        <div className="pds-subject">{item.subject}</div>
                        <div className="pds-topic">{item.topic}</div>
                   </div>
                   <div className="pds-details-container">
                        <div className="pds-days-container">
                            <div className="pds-label">Days</div>
                            <div className="pds-value">{item.days}</div>
                        </div>
                        <div className="pds-time-container">
                            <div className="pds-label">Time Zones</div>
                            <div className="pds-value">{item.time}</div>
                        </div>
                   </div>
                </div>
             ))}
         </div>
      </section>

      {/* Jobs Completed Section */}
      <section className="pds-section jobs-section">
         <div className="pds-header">
             <h3 className="pds-title">Jobs Completed</h3>
             {/* No change button shown in image */}
         </div>
          <div className="pds-list jobs-list">
             {jobsData.map((item, index) => (
                <div key={index} className="pds-item jobs-item">
                   <div className="pds-subject-topic">
                        <div className="pds-subject">{item.subject}</div>
                        <div className="pds-topic">{item.topic}</div>
                   </div>
                   <div className="pds-details-container">
                        <div className="pds-days-container">
                            <div className="pds-label">Days</div>
                            <div className="pds-value">{item.days}</div>
                        </div>
                        <div className="pds-time-container">
                            <div className="pds-label">Time Zones</div>
                            <div className="pds-value">{item.time}</div>
                        </div>
                   </div>
                </div>
             ))}
         </div>
      </section>

      {/* Student Rating / Badges Section */}
      <section className="pds-section rating-section">
         <div className="pds-header">
             <h3 className="pds-title">Student Rating / Badges</h3>
              {/* No change button shown in image */}
         </div>
         {/* Add rating/badges display logic here */}
         <div className="pds-placeholder-content">[Rating & Badges Display]</div>
      </section>

      {/* Language Section */}
       <section className="pds-section language-section">
         <div className="pds-header">
             <h3 className="pds-title">Language</h3>
              {/* No change button shown in image */}
         </div>
         {/* Add language display logic here */}
         <div className="pds-placeholder-content">[Language Display]</div>
      </section>

    </div>
  );
};

export default ProfileDetailsSections; 