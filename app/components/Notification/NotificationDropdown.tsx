import React, { useState, useEffect } from 'react';
import styles from '../../styles/notificationDropdown.module.css'; 

interface Notification {
  id: string;
  type: 'general' | 'request'; 
  imageUrl: string; 
  text: string; 
  timestamp: string; 
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void; 
  onSeePrevious: () => void; 
  onClose: () => void; 
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onNotificationClick,
  onSeePrevious,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'request'>('general');

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(n => n.type === activeTab);

  // Calculate counts for badges
  const generalCount = notifications.filter(n => n.type === 'general').length;
  const requestCount = notifications.filter(n => n.type === 'request').length;

  // Example effect to handle clicks outside the dropdown to close it
  // You might need a more robust solution depending on your app structure
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown element
      // This requires adding a ref to the main div
      // For simplicity, this part is omitted, but it's important for UX
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.notificationDropdown}>
      <div className={styles.notificationHeader}>
        Notifications
      </div>

      <div className={styles.notificationTabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'general' ? styles.active : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
          {generalCount > 0 && <span className={styles.tabCount}>{generalCount}</span>}
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'request' ? styles.active : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Requests
          {requestCount > 0 && <span className={styles.tabCount}>{requestCount}</span>}
        </button>
      </div>

      <div className={styles.notificationList}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div key={notification.id} className={styles.notificationItem}>
              <img src={notification.imageUrl} alt="" className={styles.notificationItemImage} />
              <div className={styles.notificationItemContent}>
                <p className={styles.notificationItemText}>{notification.text}</p>
                <p className={styles.notificationItemTime}>{notification.timestamp}</p>
                <button
                  className={styles.notificationItemDetailsButton}
                  onClick={() => onNotificationClick(notification.id)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noNotifications}>
            No {activeTab} notifications.
          </div>
        )}
      </div>

      {/* Conditionally render the "See Previous" button if needed */}
      {/* You might want to show this only if there are more pages of notifications */}
      <button className={styles.seePreviousButton} onClick={onSeePrevious}>
        See Previous Notification
      </button>
    </div>
  );
};

export default NotificationDropdown; 