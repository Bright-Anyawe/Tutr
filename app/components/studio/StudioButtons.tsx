import React from 'react';
import '../../styles/studio/SearchForm.css';

interface SearchFormProps {
  onCreateLesson?: () => void;
  onReset?: () => void;
  onScribble?: () => void;
}

const StudioButtons: React.FC<SearchFormProps> = ({
  onCreateLesson,
  onReset,
  onScribble
}) => {
  return (
    <div className="search-form-container">
      <div className="footer-left">
        <button 
          className="footer-button reset-button" 
          onClick={onReset}
        >
          Reset All
        </button>
      </div>
      <div className="footer-center">
        <button className="footer-button nav-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6667 2.66667L12 4L8 8L12 12L10.6667 13.3333L5.33333 8L10.6667 2.66667Z" fill="white"/>
          </svg>
        </button>
        <button className="footer-button nav-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33333 2.66667L4 4L8 8L4 12L5.33333 13.3333L10.6667 8L5.33333 2.66667Z" fill="white"/>
          </svg>
        </button>
        <button 
          className="footer-button scribble-button"
          onClick={onScribble}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7073 3.29333C12.5203 3.48 12.2663 3.585 12.0003 3.585C11.7343 3.585 11.4803 3.48 11.2933 3.29333C11.1063 3.106 11.0013 2.852 11.0013 2.586C11.0013 2.32 11.1063 2.066 11.2933 1.879C11.6673 1.505 12.3333 1.505 12.7073 1.879C12.8943 2.066 12.9993 2.32 12.9993 2.586C12.9993 2.852 12.8943 3.106 12.7073 3.29333ZM11 4.414L2 13.414V14H2.586L11.586 5H14V2.414L11 4.414Z" fill="white"/>
          </svg>
          Scribble
        </button>
      </div>
      <div className="footer-right">
        <button 
          className="create-lesson-button"
          onClick={onCreateLesson}
        >
          Create Lesson
        </button>
      </div>
    </div>
  );
};

export default StudioButtons; 