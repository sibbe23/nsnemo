import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import CandidateLogin from './components/LoginForm/CandidateLogin';
import UserDashboard from './components/Dashboard/User';
import CandidateDashboard from './components/Dashboard/Candidate';
import DarkModeToggle from './components/Darkmode/DarkmodeToggle';
import Sidebar from './components/Sidebar/Sidebar'; // Import Sidebar component

function App() {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} /> {/* Pass down dark mode state */}
        <Sidebar darkMode={darkMode} /> {/* Pass down dark mode state */}

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/candidate-login" element={<CandidateLogin />} />
          {/* Pass down dark mode state to UserDashboard and CandidateDashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
