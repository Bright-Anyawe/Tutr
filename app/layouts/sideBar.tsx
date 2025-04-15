import React, { useState } from 'react';
import styles from '../styles/sideBar.module.css';
import { MessageSquare, Plus, PanelLeft, PanelRight } from "lucide-react"
import LessonForm from '../components/lessonForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [showLessonForm, setShowLessonForm] = useState(false);
  const navigate = useNavigate();
  const { isSidebarExpanded, toggleSidebar } = useAuth();

  const handleCreateLesson = (lessonData: { course: string; topic: string; student?: string }) => {
    console.log('Creating lesson:', lessonData);
    setShowLessonForm(false);
    navigate('/studio', { state: { lessonData } });
  };

  return (
    <div className={`${styles.sidebarContainer} ${className || ""}`}>
      <aside className={`${styles.sidebar} ${!isSidebarExpanded ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label={!isSidebarExpanded ? "Expand sidebar" : "Collapse sidebar"}
          >
            {!isSidebarExpanded ? <PanelRight size={20} /> : <PanelLeft size={20} />}
          </button>
          {isSidebarExpanded && (
            <button className={styles.chatButton}>
              <MessageSquare size={20} />
              <span>New Chat</span>
            </button>
          )}
        </div>
        <div className={styles.sidebarContent}>
          <button 
            className={styles.createButton}
            onClick={() => setShowLessonForm(true)}
          >
            {isSidebarExpanded ? (
              <>
                Create new lesson
                <Plus size={20} />
              </>
            ) : (
              <Plus size={20} />
            )}
          </button>
        </div>
        <div className={styles.sidebarBody}>{/* Sidebar content would go here */}</div>
      </aside>
      {showLessonForm && (
        <LessonForm
          onClose={() => setShowLessonForm(false)}
          onSubmit={handleCreateLesson}
        />
      )}
    </div>
  )
}

export default Sidebar;
