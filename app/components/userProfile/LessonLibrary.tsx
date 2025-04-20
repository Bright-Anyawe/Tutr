import React from 'react';
import '../../styles/userProfile/UserProfileLayout.css'; // Use the layout's CSS

interface Lesson {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  thumbnail?: string; // Optional thumbnail URL
}

interface LessonLibraryProps {
  lessons?: Lesson[];
}

const LessonLibrary: React.FC<LessonLibraryProps> = ({ lessons = [] }) => {
  // Sample data if no lessons provided, matching the image
  const sampleLessons: Lesson[] = [
    {
      id: '1',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2025', // Date from image
      time: '4:54pm',   // Time from image
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
      {/* Sidebar for the lesson library section */}
      <div className="lesson-sidebar">
        <div className="sidebar-item active">
          <span>My Library</span>
        </div>
        <div className="sidebar-item">
          <span>Draft</span>
        </div>
      </div>

      {/* Main content panel for the lesson library */}
      <div className="lesson-content-panel">
        <div className="profile-header">
          <h1>My Lessons</h1>
          <h2>My Library</h2>
        </div>
        
        <div className="lesson-list">
          {displayLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-thumbnail">
                {/* <button className="play-button"> */}
                 <img src="/Images/play.png" alt="" />
                {/* </button> */}
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
      </div>
    </>
  );
};

export default LessonLibrary; 