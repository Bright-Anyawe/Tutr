import React, { useState } from "react";
import CourseHeader from "../components/CourseHeader";
import ChatInterface from "../components/studio/ChatInterface";
import StudioView from "../components/studio/StudioView";
import { CourseProvider } from "../components/CourseContext";
import "../styles/layouts/StudioPageLayout.css";
import Header from "../layouts/header";

const StudioPageLayout: React.FC = () => {
  const [showChat, setShowChat] = useState(true);

  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
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
        <div
          className={`studio-content-container ${
            showChat ? "with-chat" : "no-chat"
          }`}
        >
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
