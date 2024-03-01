// User.js
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const User = ({ children }) => {
  return (
    <div className="user">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default User;
