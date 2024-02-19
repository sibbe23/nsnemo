import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas } from 'bootstrap';
import { BsList, BsFillPersonFill } from 'react-icons/bs'; // Hamburger icon"

import { Collapse, Dropdown } from 'react-bootstrap'; // Importing Collapse component from react-bootstrap

const Sidebar = ({ darkMode }) => {
  useEffect(() => {
    const offcanvasElement = document.getElementById('offcanvasExample');
    const offcanvas = new Offcanvas(offcanvasElement, {
      backdrop: false // Disable backdrop
    });

    // Show the offcanvas when component mounts
    offcanvas.show();

    // Prevent closing when clicking outside the sidebar
    const handleOutsideClick = (event) => {
      if (!offcanvasElement.contains(event.target)) {
        event.stopPropagation();
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // State management for dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <>
      {/* Hamburger icon button */}
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <BsList />
      </button>
      <div className={`offcanvas offcanvas-start ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '200px' }}>
        <div className="offcanvas-header mt-1 mb-0 pb-0">
          <h5 className="offcanvas-title  fst-italic " id="offcanvasExampleLabel">Nsnemo</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {/* Settings */}
          <div>
            <p style={{ fontSize: '10px' }} className='mb-1 fst-italic '><li>Settings</li></p>
            {/* Company Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 company-btn ${activeDropdown === 'company' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('company')}
            >
              Company <span className={`float-end ${activeDropdown === 'company' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'company'}>
              <div className="company-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Vessel Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 vessel-btn ${activeDropdown === 'vessel' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('vessel')}
            >
              Vessel <span className={`float-end ${activeDropdown === 'vessel' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'vessel'}>
              <div className="vessel-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Experience Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 experience-btn ${activeDropdown === 'experience' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('experience')}
            >
              Experience <span className={`float-end ${activeDropdown === 'experience' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'experience'}>
              <div className="experience-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Rank Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 rank-btn ${activeDropdown === 'rank' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('rank')}
            >
              Rank <span className={`float-end ${activeDropdown === 'rank' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'rank'}>
              <div className="rank-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Grade Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 grade-btn ${activeDropdown === 'grade' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('grade')}
            >
              Grade <span className={`float-end ${activeDropdown === 'grade' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'grade'}>
              <div className="grade-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Port Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 port-btn ${activeDropdown === 'port' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('port')}
            >
              Port <span className={`float-end ${activeDropdown === 'port' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'port'}>
              <div className="port-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Port Agent Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 port-agent-btn ${activeDropdown === 'portAgent' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('portAgent')}
            >
              Port Agent <span className={`float-end ${activeDropdown === 'portAgent' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'portAgent'}>
              <div className="port-agent-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Hospital Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 hospital-btn ${activeDropdown === 'hospital' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('hospital')}
            >
              Hospital <span className={`float-end ${activeDropdown === 'hospital' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'hospital'}>
              <div className="hospital-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Document Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 doc-btn ${activeDropdown === 'doc' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('doc')}
            >
              Document <span className={`float-end ${activeDropdown === 'doc' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'doc'}>
              <div className="doc-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Country Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 country-btn ${activeDropdown === 'country' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('country')}
            >
              Country <span className={`float-end ${activeDropdown === 'country' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'country'}>
              <div className="country-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
            {/* Vendor Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 w-100 vendor-btn ${activeDropdown === 'vendor' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('vendor')}
            >
              Vendor <span className={`float-end ${activeDropdown === 'vendor' ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            <Collapse in={activeDropdown === 'vendor'}>
              <div className="vendor-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">List</button>
              </div>
            </Collapse>
          </div>
          {/* End of Settings */}
          {/* Candidate Management */}
          <div>
            <p style={{ fontSize: '10px' }} className='mt-3 mb-1 fst-italic '><li>Candidate Management</li></p>
            {/* Candidate Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2 d-block w-100 ${activeDropdown === 'candidate' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('candidate')}
            >
              Candidate
            </button>
            <Collapse in={activeDropdown === 'candidate'}>
              <div className="candidate-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100" >Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 d-block w-100 mb-2">List</button>
              </div>
            </Collapse>
          </div>
          {/* End of Candidate Management */}
          {/* User Management */}
          <div>
            <p style={{ fontSize: '10px' }} className='mt-3 mb-1 fst-italic '><li>User Management</li></p>
            {/* User Dropdown */}
            <button
              type="button"
              className={`btn btn-outline-primary text-start border-0 mb-2  d-block w-100 ${activeDropdown === 'user' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('user')}
            >
              User
            </button>
            <Collapse in={activeDropdown === 'user'}>
              <div className="user-buttons">
                <button type="button" className="btn btn-outline-primary text-start border-0 mb-2 d-block w-100">Add</button>
                <button type="button" className="btn btn-outline-primary text-start border-0 d-block w-100 mb-2">List</button>
              </div>
            </Collapse>
          </div>
          {/* End of User Management */}
          <div>
            {/* Other dropdowns go here */}
            {/* Search Dropdown */}
            <p style={{ fontSize: '10px' }} className='mt-3 mb-1 fst-italic '><li>Others</li></p>
            <button type='button' className='btn btn-outline-primary text-start border-0 mb-2 d-block w-100' onClick={() => window.open('https://example.com', '_blank')}>
              Search
            </button>
            {/* Reports Dropdown */}
            <button type='button' className='btn btn-outline-primary text-start border-0 mb-2 d-block w-100' onClick={() => window.open('https://example.com/reports', '_blank')}>
              Reports
            </button>
            {/* Help Dropdown */}
            <button type='button' className='btn btn-outline-primary text-start border-0 mb-2 d-block w-100' onClick={() => window.open('https://example.com/help', '_blank')}>
              Crew Planner
            </button>
            {/* Logout Button */}<hr></hr>
            <button type='button' className='btn btn-outline-danger text-start border-0 mb-2 d-block w-100' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
