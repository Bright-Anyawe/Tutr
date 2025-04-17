import React, { useState, useRef, useEffect } from 'react';
import '../../styles/studio/ChatInterface.css';
import SearchForm from '../common/searchForm';
import MessageReact from './messageReact';
import CopyEdit from './Copy-Edit';

interface Message {
  type: 'ai' | 'user';
  content: string;
  actions?: string[];
}

interface ChatInterfaceProps {
  onClose?: () => void;
  onSendMessage?: (message: string) => void;
  onAction?: (action: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onClose,
  onSendMessage,
  onAction 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'Hi dara? what visuals will like to create ?',
    },
    {
      type: 'user',
      content: 'Display a graph'
    },
    {
      type: 'ai',
      content: "What type of graph?\n• Line, bar, pie, scatter?\n• What data should it show?\n• Any labels, colors, or styling preferences?\n\nLet me know and I'll generate it for you.",
    },
    {
      type: 'user',
      content: 'A Pie chart. Sort out the rest'
    },
    {
      type: 'ai',
      content: 'To create a pie chart, I need:\n• Categories (e.g. departments, regions, product types)\n• Values for each category (e.g. revenue, headcount, usage)\n\nDo you need the data set?'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        type: 'user',
        content: inputValue
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Call the external handler if provided
      if (onSendMessage) {
        onSendMessage(inputValue);
      }
      
      // Simulate AI response based on user input
      handleAIResponse(inputValue);
      
      // Clear input
      setInputValue('');
    }
  };
  
  const handleAIResponse = (userInput: string) => {
    let aiResponse: Message | null = null;

    if (userInput.toLowerCase().includes('graph')) {
      const found = messages.find(m => m.content.startsWith("What type of graph?"));
      aiResponse = found ?? null;
    } else if (userInput.toLowerCase().includes('pie chart') || userInput.toLowerCase().includes('pie')) {
      const found = messages.find(m => m.content.startsWith("To create a pie chart"));
      aiResponse = found ?? null;
    } else if (userInput.toLowerCase().includes('hi') || userInput.toLowerCase().includes('hello')) {
      const found = messages.find(m => m.content.startsWith("Hi dara?"));
      aiResponse = found ?? null;
    }

    if (aiResponse) {
      if (messages[messages.length - 1]?.content !== aiResponse.content) {
        setTimeout(() => {
          setMessages(prev => [...prev, { ...aiResponse }]);
        }, 600);
      }
    }
  };
  
  const handleActionClick = (action: string) => {
    // Add the action as a user message
    setMessages(prev => [...prev, { type: 'user', content: action }]);
    
    // Call the external handler if provided
    if (onAction) {
      onAction(action);
    }
    
    // Simulate AI response based on action clicked
    if (action === 'Display a graph') {
      handleAIResponse('graph');
    } else if (action === 'A Pie chart! Sort out the rest' || action === 'A Pie chart.Sort out the rest') {
      handleAIResponse('pie chart');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      line.startsWith('•') ? (
        <div key={i} className="bullet-point">{line}</div>
      ) : (
        <p key={i} style={{ margin: 0 }}>{line || '\u00A0'}</p>
      )
    ));
  };
  
  return (
    <div className="chat-interface">
      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.type === 'ai' ? 'ai-message' : 'user-message'}`}
          >
            <div className="message-content">
              {renderMessageContent(message.content)}
            </div>
            
            {message.type === 'ai' && message.content.startsWith("Hi dara?") && (
              <div className="message-actions separate-actions">
                <button className="action-button" onClick={() => handleActionClick('Display a graph')}>
                  Display a graph
                </button>
              </div>
            )}
            
            {message.type === 'ai' && message.content.startsWith("What type of graph?") && (
              <div className="message-actions separate-actions">
                <button className="action-button" onClick={() => handleActionClick('A Pie chart.Sort out the rest')}>
                  A Pie chart.Sort out the rest
                </button>
              </div>
            )}

            {message.type === 'ai' && (
             <MessageReact /> 
            )}
            
            {message.type === 'user' && message.content.includes('Sort out the rest') && (
              <CopyEdit />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <SearchForm />
    </div>
  );
};

export default ChatInterface; 