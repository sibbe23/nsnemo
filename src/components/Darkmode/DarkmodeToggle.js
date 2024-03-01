import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem('darkMode', updatedDarkMode.toString());
  };

  useEffect(() => {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModeEnabled);
  }, []);

  useEffect(() => {
    const applyTheme = (isDarkMode) => {
      const body = document.body;
      if (isDarkMode) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    };
    applyTheme(darkMode);
  }, [darkMode]);

  return (
    <div className="dark-mode-toggle-container d-flex align-items-center justify-content-end">
      <span className="mr-2">
        <FontAwesomeIcon className='link' icon={darkMode ? faMoon : faSun} />
      </span>
      <Form.Check
        type="switch"
        id="custom-switch"
        label=""
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{ marginLeft: '10px', marginTop: '2.5px' }}
      />
    </div>
  );
};

export default DarkModeToggle;
