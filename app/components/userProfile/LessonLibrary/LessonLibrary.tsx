import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LessonLibrary.css';

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

const LessonLibrary: React.FC<LessonLibraryProps> = ({ lessons = [] }) => {
  // Sample data if no lessons provided
  const sampleLessons: Lesson[] = [
    {
      id: '1',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2023',
      time: '4:45pm',
    },
    {
      id: '2',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/08/2023',
      time: '4:55pm',
    },
    {
      id: '3',
      course: 'Econ 101',
      title: 'Introduction to Economics',
      date: '5/05/2023',
      time: '4:45pm',
    }
  ];

  const displayLessons = lessons.length > 0 ? lessons : sampleLessons;

  return (
    <div className="lesson-library-container">
      <div className="lesson-sidebar">
        <div className="sidebar-item active">
          <span>My Library</span>
        </div>
        <div className="sidebar-item">
          <span>Draft</span>
        </div>
      </div>
      
      <div className="lesson-content">
        <div className="lesson-header">
          <h1>My Lessons</h1>
          <h2>My Library</h2>
        </div>
        
        <div className="lesson-list">
          {displayLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-thumbnail">
                <button className="play-button">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
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
    </div>
  );
};

export default LessonLibrary; 