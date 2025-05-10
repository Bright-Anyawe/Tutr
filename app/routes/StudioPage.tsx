import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudioView from '../components/studio/StudioView';
import ChatInterface from '../components/studio/ChatInterface';
import CourseHeader from '../components/CourseHeader';
import { CourseProvider } from '../components/CourseContext';
import Header from '../layouts/header';
import '../styles/StudioPage.css';

// const Header: React.FC = () => (
//   <header className="main-header">
//     <div className="logo">tutr</div>
//     <div className="header-actions">
//       <button className="header-button">Connect to Outboard</button>
//       <button className="header-button">Pro</button>
//       <button className="header-button notification">1</button>
//       <div className="avatar-button">
//         <img src="/path-to-avatar.jpg" alt="User avatar" onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff"><circle cx="12" cy="12" r="12" fill="%23E74C3C"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12" fill="%23ffffff">A</text></svg>';
//         }} />
//       </div>
//     </div>
//   </header>
// );

const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate(-1);
  };
  
  return (
    <CourseProvider>
      <div className="studio-page">
        <Header />
        
        <Header />
        
        <div className="studio-page-content">
          <div className="chat-panel">
            <ChatInterface onAction={(action) => {
              console.log('Action triggered:', action);
            }} />
          </div>
          
          <div className="studio-view-panel">
            <StudioView onClose={handleClose} />
          </div>
        </div>
      </div>
    </CourseProvider>
  );
};

export default StudioPage; 