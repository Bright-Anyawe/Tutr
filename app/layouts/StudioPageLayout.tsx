import React, { useState } from 'react';
import CourseHeader from '../components/Headers/CourseHeader';
import ChatInterface from '../components/Studio/ChatInterface';
import StudioView from '../components/Studio/StudioView';
import { CourseProvider } from '../contexts/CourseContext';
import '../styles/layouts/StudioPageLayout.css';
import Header from '~/layouts/Header';

const StudioPageLayout: React.FC = () => {
  const [showChat, setShowChat] = useState(true);
  
  const handleToggleChat = () => {
    setShowChat(prev => !prev);
  };
  
  return (
    <div className="studio-page-layout">
      {/* Main Header */}
      <div className="main-header-container">
        <Header />
      </div>
      
      {/* Course Header */}
      <CourseProvider>
        <div className="course-header-container">
          <CourseHeader />
        </div>
        
        {/* Main Content Area */}
        <div className={`studio-content-container ${showChat ? 'with-chat' : 'no-chat'}`}>
          {/* Chat Interface (Left) */}
          {showChat && (
            <div className="chat-interface-container">
              <ChatInterface onClose={handleToggleChat} />
            </div>
          )}
          
          {/* Studio View (Right) */}
          <div className="studio-view-container">
            <StudioView />
          </div>
        </div>
      </CourseProvider>
    </div>
  );
};

export default StudioPageLayout; 