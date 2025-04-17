import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/studio/StudioView.css';
import PieChart from './PieChart';
import StudioButtons from './StudioButtons';
import ChatInterface from './ChatInterface';
import StudioHeader from './StudioHeader';
import StudioFooterControls from './StudioFooterControls';

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
  
  // State for window behavior
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [originalSize, setOriginalSize] = useState({ width: 800, height: 600 });
  const [originalPosition, setOriginalPosition] = useState({ x: 50, y: 50 });
  
  // Refs
  const studioRef = useRef<HTMLDivElement>(null);
  
  const displayChat = showChat !== undefined ? showChat : localShowChat;
  
  const [chartData, setChartData] = useState([
    { label: 'Development', value: 30, color: '#FF6384' },
    { label: 'Sales', value: 15, color: '#FF9F40' },
    { label: 'Marketing', value: 25, color: '#FFCD56' },
    { label: 'HR', value: 10, color: '#4BC0C0' },
    { label: 'Support', value: 20, color: '#36A2EB' },
  ]);
  
  // Handle maximize and restore
  const handleExpandClick = () => {
    if (!isMaximized) {
      // Save current position and size for restoration
      setOriginalSize(size);
      setOriginalPosition(position);
      
      // Maximize the window
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight - 50 // Leaving some space for the header
      });
    } else {
      // Restore to original position and size
      setIsMaximized(false);
      setPosition(originalPosition);
      setSize(originalSize);
    }
  };
  
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
  
  // Start drag operation
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.closest('.studio-header')) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };
  
  // Resize handlers
  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    setResizeDirection(direction);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Mouse move handler for both dragging and resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Keep the window within viewport bounds
      setPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
        y: Math.max(0, Math.min(newY, window.innerHeight - size.height))
      });
    } else if (resizing && !isMaximized) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      // Minimum size constraints
      const minWidth = 400;
      const minHeight = 300;
      
      switch(resizeDirection) {
        case 'e': // east (right)
          setSize(prev => ({
            ...prev,
            width: Math.max(minWidth, prev.width + deltaX)
          }));
          setDragStart(prev => ({ ...prev, x: e.clientX }));
          break;
        case 's': // south (bottom)
          setSize(prev => ({
            ...prev,
            height: Math.max(minHeight, prev.height + deltaY)
          }));
          setDragStart(prev => ({ ...prev, y: e.clientY }));
          break;
        case 'se': // southeast (bottom-right corner)
          setSize(prev => ({
            width: Math.max(minWidth, prev.width + deltaX),
            height: Math.max(minHeight, prev.height + deltaY)
          }));
          setDragStart({ x: e.clientX, y: e.clientY });
          break;
        case 'sw': // southwest (bottom-left corner)
          const newWidth = Math.max(minWidth, size.width - deltaX);
          setSize(prev => ({
            width: newWidth,
            height: Math.max(minHeight, prev.height + deltaY)
          }));
          setPosition(prev => ({
            x: prev.x + (size.width - newWidth),
            y: prev.y
          }));
          setDragStart({ x: e.clientX, y: e.clientY });
          break;
        case 'w': // west (left)
          const newWidthW = Math.max(minWidth, size.width - deltaX);
          setSize(prev => ({
            ...prev,
            width: newWidthW
          }));
          setPosition(prev => ({
            x: prev.x + (size.width - newWidthW),
            y: prev.y
          }));
          setDragStart(prev => ({ ...prev, x: e.clientX }));
          break;
        case 'n': // north (top)
          const newHeightN = Math.max(minHeight, size.height - deltaY);
          setSize(prev => ({
            ...prev,
            height: newHeightN
          }));
          setPosition(prev => ({
            x: prev.x,
            y: prev.y + (size.height - newHeightN)
          }));
          setDragStart(prev => ({ ...prev, y: e.clientY }));
          break;
        case 'ne': // northeast (top-right corner)
          const newHeightNE = Math.max(minHeight, size.height - deltaY);
          setSize(prev => ({
            width: Math.max(minWidth, prev.width + deltaX),
            height: newHeightNE
          }));
          setPosition(prev => ({
            x: prev.x,
            y: prev.y + (size.height - newHeightNE)
          }));
          setDragStart({ x: e.clientX, y: e.clientY });
          break;
        case 'nw': // northwest (top-left corner)
          const newWidthNW = Math.max(minWidth, size.width - deltaX);
          const newHeightNW = Math.max(minHeight, size.height - deltaY);
          setSize({
            width: newWidthNW,
            height: newHeightNW
          });
          setPosition({
            x: position.x + (size.width - newWidthNW),
            y: position.y + (size.height - newHeightNW)
          });
          setDragStart({ x: e.clientX, y: e.clientY });
          break;
      }
    }
  };
  
  // Stop dragging or resizing
  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    if (isDragging || resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, resizing, dragStart, size, position, resizeDirection, isMaximized]);
  
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
    <div 
      ref={studioRef}
      className={`studio-container ${isMaximized ? 'maximized' : ''}`}
      style={!isStudioMode ? {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: isDragging || resizing ? 'none' : 'all 0.2s ease',
        zIndex: 1000
      } : {}}
      onMouseDown={handleMouseDown}
    >
      <StudioHeader 
        onExpandClick={handleExpandClick} 
        onCloseClick={handleCloseClick}
      />
      
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
      <StudioFooterControls 
        onCreateLesson={handleCreateLesson}
        onReset={handleReset}
        onScribble={handleScribble}
      />
      
      {/* Resize handles - only show when not maximized */}
      {!isMaximized && !isStudioMode && (
        <>
          <div className="resize-handle n" onMouseDown={(e) => handleResizeStart('n', e)}></div>
          <div className="resize-handle e" onMouseDown={(e) => handleResizeStart('e', e)}></div>
          <div className="resize-handle s" onMouseDown={(e) => handleResizeStart('s', e)}></div>
          <div className="resize-handle w" onMouseDown={(e) => handleResizeStart('w', e)}></div>
          <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart('ne', e)}></div>
          <div className="resize-handle se" onMouseDown={(e) => handleResizeStart('se', e)}></div>
          <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart('sw', e)}></div>
          <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart('nw', e)}></div>
        </>
      )}
    </div>
  );
};

export default StudioView; 