import React from "react";
import '../../../styles/userProfile/Analytics.css';

const Analytics: React.FC = () => {
  // These values match the screenshot provided
  const completedJobs = 10;
  const numRequests = 9;

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      <div className="analytics-cards">
        <div className="analytics-card">
          <div className="analytics-card-label">No. of Completed Jobs</div>
          <div className="analytics-card-value">{completedJobs}</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-card-label">No. of Requests</div>
          <div className="analytics-card-value">{numRequests}</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
