import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Candidatestatus from '../Extras/Candidatestatus';

const User = ({ children }) => {
  return (
    <div className="user p-5">
      <Sidebar />
      <div className="main-content">
      <div>
      <h1>Dashboard</h1>
      <Link to="/birthday-reminder">
        Birthday Reminder
      </Link>
      <Candidatestatus/>
    </div>
        {children}
      </div>
    </div>
  );
}

export default User;
