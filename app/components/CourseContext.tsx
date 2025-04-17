import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export interface CourseInfo {
  courseCode: string;
  courseName: string;
}

interface CourseContextType {
  courseInfo: CourseInfo;
  updateCourseInfo: (newCourseInfo: CourseInfo) => void;
}

const defaultCourseInfo: CourseInfo = {
  courseCode: 'Econ 101',
  courseName: 'Introduction to Economics'
};

const CourseContext = createContext<CourseContextType>({
  courseInfo: defaultCourseInfo,
  updateCourseInfo: () => {}
});

export const useCourseContext = () => useContext(CourseContext);

interface CourseProviderProps {
  children: ReactNode;
  initialCourse?: CourseInfo;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ 
  children, 
  initialCourse = defaultCourseInfo 
}) => {
  const [courseInfo, setCourseInfo] = useState<CourseInfo>(initialCourse);

  const updateCourseInfo = (newCourseInfo: CourseInfo) => {
    setCourseInfo(newCourseInfo);
  };

  return (
    <CourseContext.Provider value={{ courseInfo, updateCourseInfo }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext; 