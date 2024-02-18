import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem('darkMode', updatedDarkMode.toString());
  };

  useEffect(() => {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModeEnabled);
  }, [setDarkMode]);

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
    <div className="dark-mode-toggle position-absolute d-flex align-items-center justify-content-end" style={{ right: '10px', top: '10px' }}>
      <div className="mr-2">
        <FontAwesomeIcon icon={darkMode ? faMoon : faSun} color={darkMode ? '#ffffff' : '#000000'} />
      </div>
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
