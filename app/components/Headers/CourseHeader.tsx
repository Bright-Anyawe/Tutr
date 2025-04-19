import React from 'react';
import '../../styles/CourseHeader.css';
import { useCourseContext } from '../../contexts/CourseContext';

interface CourseHeaderProps {
  className?: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ className = '' }) => {
  const { courseInfo } = useCourseContext();
  
  return (
    <div className={`course-header ${className}`}>
      <div className="course-container">
        <div className="course-code">{courseInfo.courseCode}</div>
        <div className="course-name">{courseInfo.courseName}</div>
      </div>
    </div>
  );
};

export default CourseHeader; 