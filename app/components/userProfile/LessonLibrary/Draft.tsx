import React from 'react';
import '../../../styles/userProfile/Draft.css'; // Dedicated CSS for Draft section

interface DraftLesson {
  id: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  thumbnail?: string; // Optional thumbnail URL
}

interface DraftProps {
  drafts?: DraftLesson[];
}

const Draft: React.FC<DraftProps> = ({ drafts = [] }) => {
  // Sample data matching the image if no drafts provided
  const sampleDrafts: DraftLesson[] = [
    {
      id: 'd1',
      subject: 'Math',
      topic: 'Calculus',
      date: '5/05/2025',
      time: '4:54pm',
    },
    {
      id: 'd2',
      subject: 'Math',
      topic: 'Calculus',
      date: '5/05/2025',
      time: '4:54pm',
    }
  ];

  const displayDrafts = drafts.length > 0 ? drafts : sampleDrafts;

  return (
    <div className="draft-container">
      <div className="draft-header">
        <h2>Drafts</h2>
        <p className="draft-subtitle">Continue editing your tutorial video</p>
      </div>
      <div className="draft-lesson-list">
        {displayDrafts.map((draft) => (
          <div key={draft.id} className="draft-lesson-card">
            <div className="draft-lesson-thumbnail">
               {/* Using img tag as per LessonLibrary example */}
               <img src="/Images/play.png" alt="Play draft lesson" />
            </div>
            <div className="draft-lesson-details">
              <div className="draft-lesson-subject">{draft.subject}</div>
              <div className="draft-lesson-topic">{draft.topic}</div>
              <div className="draft-lesson-meta">
                {draft.date} • {draft.time}
              </div>
              <button className="complete-editing-button">Complete editing</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Draft; 