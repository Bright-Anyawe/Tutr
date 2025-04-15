import React from 'react';
import styles from '../styles/dashboardHeader.module.css';

const DashboardHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>tutr</div>
      <div className={styles.headerRight}>
        <div className={styles.headerActions}>
          <a href="#" className={styles.actionButton}>Connect to Collab.ai®</a>
          <a href="#" className={styles.actionButton}>Pro</a>
        </div>
        <div className={styles.notificationBadge}>
          <span className={styles.notificationDot}></span>
          🔔
        </div>
        <div className={styles.userProfile}>
          <img src="/path-to-avatar" alt="User avatar" width="32" height="32" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 