import React, { useState } from 'react';
import '../../../styles/userProfile/UserProfileLayout.css'; // Layout styles
import '../../../styles/userProfile/Draft.css'; // Styles for Draft content
import Draft from './Draft'; // Import the Draft component

interface Lesson {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  thumbnail?: string;
}

interface LessonLibraryProps {
  lessons?: Lesson[];
}

// Component to display the actual list of library lessons
const LibraryList: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => (
  <div className="lesson-list">
    {lessons.map((lesson) => (
      <div key={lesson.id} className="lesson-card">
        <div className="lesson-thumbnail">
          <img src="/Images/play.png" alt="Play lesson" />
        </div>
        <div className="lesson-details">
          <div className="lesson-course">{lesson.course}</div>
          <div className="lesson-title">{lesson.title}</div>
          <div className="lesson-meta">
            {lesson.date} • {lesson.time}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Main container component that manages state
const LessonLibraryContainer: React.FC<LessonLibraryProps> = ({ lessons = [] }) => {
  const [activeView, setActiveView] = useState('My Library'); // State: 'My Library' or 'Draft'

  // Sample data (replace with actual data fetching/props)
  const sampleLessons: Lesson[] = [
    {
      id: '1',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2025',
      time: '4:54pm',
    },
    {
      id: '2',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2025',
      time: '4:54pm',
    },
    {
      id: '3',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2025',
      time: '4:54pm',
    }
  ];

  const displayLessons = lessons.length > 0 ? lessons : sampleLessons;

  return (
    <>
      {/* Sidebar - Updates state and gets conditional active class */}
      <div className="lesson-sidebar">
        <div 
          className={`sidebar-item ${activeView === 'My Library' ? 'active' : ''}`}
          onClick={() => setActiveView('My Library')}
        >
          <span>My Library</span>
        </div>
        <div 
          className={`sidebar-item ${activeView === 'Draft' ? 'active' : ''}`}
          onClick={() => setActiveView('Draft')}
        >
          <span>Draft</span>
        </div>
      </div>

      {/* Content Panel - Renders conditionally */}
      <div className="lesson-content-panel">
        {activeView === 'My Library' && (
          <>
            <div className="profile-header">
              <h1>My Lessons</h1>
              <h2>My Library</h2>
            </div>
            <LibraryList lessons={displayLessons} />
          </>
        )}

        {activeView === 'Draft' && (
          <>
             {/* Consistent main title */}
             <div className="profile-header">
               <h1>My Lessons</h1>
               {/* Subtitle is inside Draft component */}
             </div>
             <Draft /> {/* Render Draft component */}
           </>
        )}
      </div>
    </>
  );
};

export default LessonLibraryContainer; 