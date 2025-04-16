import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/studio/StudioView.css';
import PieChart from './PieChart';
import StudioButtons from './StudioButtons';
import ChatInterface from './ChatInterface';
import StudioHeader from './StudioHeader';

interface StudioViewProps {
  onClose?: () => void;
  onToggleChat?: () => void;
  showChat?: boolean;
}

const StudioView: React.FC<StudioViewProps> = ({ onClose, onToggleChat, showChat = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudioMode = location.pathname === '/studio-mode';
  const [localShowChat, setLocalShowChat] = useState(true);
  
  const displayChat = showChat !== undefined ? showChat : localShowChat;
  
  const [chartData, setChartData] = useState([
    { label: 'Development', value: 30, color: '#FF6384' },
    { label: 'Sales', value: 15, color: '#FF9F40' },
    { label: 'Marketing', value: 25, color: '#FFCD56' },
    { label: 'HR', value: 10, color: '#4BC0C0' },
    { label: 'Support', value: 20, color: '#36A2EB' },
  ]);
  
  const handleFullscreenClick = () => {
    if (!isStudioMode) {
      navigate('/studio-mode');
    }
  };
  
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  const handleCreateLesson = () => {
    console.log('Create lesson clicked');
    // Implementation for creating a lesson
  };
  
  const handleReset = () => {
    console.log('Reset all clicked');
    // Implementation for resetting
    setChartData([
      { label: 'Development', value: 30, color: '#FF6384' },
      { label: 'Sales', value: 15, color: '#FF9F40' },
      { label: 'Marketing', value: 25, color: '#FFCD56' },
      { label: 'HR', value: 10, color: '#4BC0C0' },
      { label: 'Support', value: 20, color: '#36A2EB' },
    ]);
  };
  
  const handleScribble = () => {
    console.log('Scribble clicked');
    // Implementation for scribble functionality
  };
  
  const handleToggleChat = () => {
    if (onToggleChat) {
      onToggleChat();
    } else {
      setLocalShowChat(prev => !prev);
    }
  };
  
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Process the message from chat
    if (message.toLowerCase().includes('pie chart')) {
      // If user asks for a pie chart, we can update the chart
      setChartData([
        { label: 'Development', value: 35, color: '#FF6384' },
        { label: 'Sales', value: 20, color: '#FF9F40' },
        { label: 'Marketing', value: 15, color: '#FFCD56' },
        { label: 'HR', value: 15, color: '#4BC0C0' },
        { label: 'Support', value: 15, color: '#36A2EB' },
      ]);
    }
  };
  
  const handleChatAction = (action: string) => {
    console.log('Chat action:', action);
    // Process actions from chat
    if (action === 'A Pie chart! Sort out the rest') {
      // If user asks for a pie chart, generate a random one
      setChartData([
        { label: 'Product A', value: Math.floor(Math.random() * 30) + 10, color: '#FF6384' },
        { label: 'Product B', value: Math.floor(Math.random() * 30) + 10, color: '#FF9F40' },
        { label: 'Product C', value: Math.floor(Math.random() * 30) + 10, color: '#FFCD56' },
        { label: 'Product D', value: Math.floor(Math.random() * 30) + 10, color: '#4BC0C0' },
        { label: 'Product E', value: Math.floor(Math.random() * 30) + 10, color: '#36A2EB' },
      ]);
    }
  };
  
  return (
    <div className="studio-container">
     <StudioHeader />
      
      <div className="studio-body-container">
        {/* Content Area */}
        <div className="studio-content">
          <div className="chart-container">
            <PieChart data={chartData} />
          </div>
        </div>
        
        {/* Chat Panel - conditionally displayed */}
      </div>
      
      {/* Footer Controls */}
      <StudioButtons 
        onCreateLesson={handleCreateLesson}
        onReset={handleReset}
        onScribble={handleScribble}
      />
    </div>
  );
};

export default StudioView; 