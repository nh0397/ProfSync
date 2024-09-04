import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import Chatbot from './Chatbot';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="dashboard light"> {/* Set to light or dark depending on your preference */}
      <div className="header">
        <h1 className="dashboard-title">Welcome, {user?.fullName || 'User'}</h1>
        <button className="logout-button" onClick={() => signOut()}>Logout</button>
      </div>
      <div className="content-container">
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
