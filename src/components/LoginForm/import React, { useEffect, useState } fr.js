import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas } from 'bootstrap';
import { jwtDecode } from 'jwt-decode';
import { FaHashtag,  FaBuilding, FaUsers, FaUser, FaSearch, FaFile, FaShip, FaAnchor, FaGlobeAmericas, FaUserCircle, FaPlusSquare, FaBookmark, FaSignOutAlt,FaChartLine} from 'react-icons/fa'; // Importing icons from react-icons
import { MdKeyboardArrowRight,MdKeyboardArrowLeft } from "react-icons/md";
import { Collapse } from 'react-bootstrap'; 
import ClockToggle from '../Assets/ClockToggle';
import { Link } from 'react-router-dom';




const Sidebar = ( ) => {

  const [permissions, setPermissions] = useState({});
  const [username, setUsername] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCandidate, setIsCandidate] = useState(false); // State to determine if the user is a candidate
  const [toggleButtonVisible, setToggleButtonVisible] = useState(true); // State to determine if the toggle button should be visible

  useEffect(() => {
    const tokenType = localStorage.getItem('token') ? 'token' : localStorage.getItem('ctoken') ? 'ctoken' : null;
    if (tokenType === 'token') {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      setUsername(decodedToken.userName);
      setPermissions({ userManagement: decodedToken.userManagement, vendorManagement: decodedToken.vendorManagement });
    } else if (tokenType === 'ctoken') {
      const decodedCtoken = jwtDecode(localStorage.getItem('ctoken'));
      setUsername(decodedCtoken.fname);
      setIsCandidate(true);
    }
  }, []);
  useEffect(() => {
    const offcanvasElement = document.getElementById('offcanvasExample');
    const offcanvas = new Offcanvas(offcanvasElement, {
      backdrop: false
    });
    const body = document.body;
  
    const handleSidebarOpen = () => {
      body.classList.add('sidebar-open');
      setToggleButtonVisible(false); // Hide the toggle button when the sidebar is opened
    };

    const handleSidebarClose = () => {
      body.classList.remove('sidebar-open');
      setToggleButtonVisible(true); // Show the toggle button when the sidebar is closed
    };
  
    offcanvasElement.addEventListener('shown.bs.offcanvas', handleSidebarOpen);
    offcanvasElement.addEventListener('hidden.bs.offcanvas', handleSidebarClose);
  
    return () => {
      offcanvasElement.removeEventListener('shown.bs.offcanvas', handleSidebarOpen);
      offcanvasElement.removeEventListener('hidden.bs.offcanvas', handleSidebarClose);
    };
  }, []);
  

  useEffect(() => {
    const offcanvasElement = document.getElementById('offcanvasExample');
    const offcanvas = new Offcanvas(offcanvasElement, {
      backdrop: false
    });
    offcanvas.show();

    const handleOutsideClick = (event) => {
      if (!offcanvasElement.contains(event.target) ) {
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };




  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleDashboard = () => {
    if (isCandidate) {
      console.log('clicked')

      // Redirect to candidate dashboard
      window.location.href = '/candidate-dashboard';
    } else {
      // Redirect to user dashboard
      console.log('clicked')

      window.location.href = '/dashboard';
    }
    
  };
  return (
    <>
       

      {/* Hamburger icon button */}
      {toggleButtonVisible && (
       <button className="btn btn-outline-dark rounded-end-pill border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ position: 'fixed', top: 0, left: 0, zIndex: 99 }}>
       <span className='dark-svg'>Menu</span><MdKeyboardArrowRight size={30} className=' ' />
     </button>
     
      )}
      
      <div className={`offcanvas offcanvas-start border-0 shadow-sm `} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '240px' }}>
         
      <div className="offcanvas-header mb-0 pb-0 bg-blue pb-3 d-flex justify-content-between align-items-center">
  <span className=' d-flex justify-content-center'>
    <div className=' ps-3 pe-3 pt-2 pb-2 ms-5 '>
      <img src="/nemo.png" alt="Logo" height={30} width={50} />
    </div>
    {/* <div className='text-center mb-0 link' style={{fontSize:"6px"}} >In collaboration with Ivistaz Ecom Services</div> */}
  </span>
  <MdKeyboardArrowLeft size={30} className='dark-svg  float-end' data-bs-dismiss="offcanvas" aria-label="Close" />
</div>

        
        
        <div className="offcanvas-body ">


          {/* Dashboard button */}
          <button
            type='button'
            className='btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 custom-dashboard-btn'
            onClick={handleDashboard}>
            <FaHashtag className="me-2 dark-svg fw-bolder" />
            <span>Dashboard</span>
          </button>
          <button
              type="button"
              className={`btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 ${activeDropdown === 'candidate' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('candidate')}>
            <FaUsers className=' me-2 dark-svg' size={16} />Candidate
            </button>
            <Collapse in={activeDropdown === 'candidate'}>
              <div className="candidate-buttons">
              <ul><li> <Link to="/candidate-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                <li><Link to="/candidate-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
              </div>
            </Collapse>
            {permissions.userManagement && (
              <span>
            <button
              type="button"
              className={`btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 ${activeDropdown === 'user' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('user')}>
            <FaUserCircle className='me-2 dark-svg' size={16}/>User
            </button>
            <Collapse in={activeDropdown === 'user'}>
              <div className="user-buttons">
              <ul><li><Link to="/user-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                <li><Link to="/user-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
              </div>
            </Collapse>
            </span>
            )}
            <Link to="/crewplanner-add" className='btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 link'>
  <FaChartLine className='me-2 dark-svg' /> Crew Planner
</Link>

<Link to="/search" className='btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 link'>
  <FaSearch className='me-2 dark-svg' />Search
</Link>
            {/* Reports Dropdown */}
            <Link to="/report" className='btn   text-start border-0 mb-2 d-inline-flex align-items-center w-100 link'>
  <FaFile className='me-2 dark-svg' />Reports
</Link>
            {/* Help Dropdown */}
            <hr/>
            <div className=''>

                {/* Company Dropdown */}
                <button
      type="button"
      className={`btn   text-start border-0 mb-2 mt-2 d-flex align-items-center w-100 company-btn ${activeDropdown === 'company' ? 'active' : ''}`}
      onClick={() => handleDropdownToggle('company')}
    >
      <FaBuilding className='me-2 dark-svg' />
      Company
      <span className={`ms-auto ${activeDropdown === 'company' ? 'arrow-up' : 'arrow-down'}`}></span>
    </button>
    <Collapse in={activeDropdown === 'company'}>
      <div className="company-buttons menu-link menu-toggle">
        <ul>
          <li> <Link to="/company-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
          <li><Link to="/company-view" className="btn   text-start border-0 mb-2 d-block w-100 link">View</Link></li>
        </ul>
      </div>
    </Collapse>

                {/* Vessel Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 vessel-btn ${activeDropdown === 'vessel' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('vessel')}
                >
                  <FaShip className='me-2 dark-svg' /> Vessel
    <span className={`float-end ${activeDropdown === 'vessel' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'vessel'}>
                  <div className="vessel-buttons menu-link menu-toggle">
                  <ul><li><Link to="/vessel-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/vessel-view" className="btn   text-start border-0 mb-2 d-block w-100 link">View</Link></li></ul>
                  </div>
                </Collapse>
                {/* Experience Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 experience-btn ${activeDropdown === 'experience' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('experience')}
                >
                <FaBookmark className='me-2 dark-svg' />Experience
    <span className={`float-end ${activeDropdown === 'experience' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'experience'}>
                  <div className="experience-buttons">
                  <ul><li><Link to="/exp-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/exp-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Rank Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 rank-btn ${activeDropdown === 'rank' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('rank')}
                >
                <FaBookmark className='me-2 dark-svg' />Rank <span className={`float-end ${activeDropdown === 'rank' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'rank'}>
                  <div className="rank-buttons">
                  <ul><li><Link to="/rank-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/rank-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Grade Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 grade-btn ${activeDropdown === 'grade' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('grade')}
                >
                <FaBookmark className='me-2 dark-svg' />Grade <span className={`float-end ${activeDropdown === 'grade' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'grade'}>
                  <div className="grade-buttons">
                  <ul><li><Link to="/grade-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/grade-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Port Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 port-btn ${activeDropdown === 'port' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('port')}
                >
                <FaAnchor className='me-2 dark-svg' />Port<span className={`float-end ${activeDropdown === 'port' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'port'}>
                  <div className="port-buttons">
                  <ul><li><Link to="/port-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/port-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Port Agent Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 port-agent-btn ${activeDropdown === 'portAgent' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('portAgent')}
                >
                <FaAnchor className='me-2 dark-svg' />Port Agent<span className={`float-end ${activeDropdown === 'portAgent' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'portAgent'}>
                  <div className="port-agent-buttons">
                  <ul><li><Link to="/portagent-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/portagent-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Hospital Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 hospital-btn ${activeDropdown === 'hospital' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('hospital')}
                >
                <FaPlusSquare className='me-2 dark-svg' />Hospital<span className={`float-end ${activeDropdown === 'hospital' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'hospital'}>
                  <div className="hospital-buttons">
                  <ul><li><Link to="/hospital-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/hospital-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Document Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 doc-btn ${activeDropdown === 'doc' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('doc')}
                >
                <FaFile className='me-2 dark-svg' />Document<span className={`float-end ${activeDropdown === 'doc' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'doc'}>
                  <div className="doc-buttons">
                  <ul><li><Link to="/doc-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/doc-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Country Dropdown */}
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 country-btn ${activeDropdown === 'country' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('country')}
                >
                <FaGlobeAmericas className='me-2 dark-svg' />Country<span className={`float-end ${activeDropdown === 'country' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'country'}>
                  <div className="country-buttons">
                  <ul><li> <Link to="/country" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                {/* Vendor Dropdown */}
                {permissions.vendorManagement && (
                  <>
                <button
                  type="button"
                  className={`btn   text-start border-0 mb-2 d-flex align-items-center w-100 vendor-btn ${activeDropdown === 'vendor' ? 'active' : ''}`}
                  onClick={() => handleDropdownToggle('vendor')}
                >
                <FaUser className='me-2 dark-svg' />Vendor<span className={`float-end ${activeDropdown === 'vendor' ? 'arrow-up' : 'arrow-down'}`}></span>
                </button>
                <Collapse in={activeDropdown === 'vendor'}>
                  <div className="vendor-buttons">
                  <ul><li><Link to="/vendor-add" className="btn   text-start border-0 mb-2 d-block w-100 link">Add</Link></li>
                    <li><Link to="/vendor-view" className="btn   text-start border-0 mb-2 d-block w-100 link">List</Link></li></ul>
                  </div>
                </Collapse>
                </>
                )}
                </div>
              {/* End of Settings */}
              {/* Candidate Management */}
            
                {/* Candidate Dropdown */}
                
              {/* End of Candidate Management */}
              {/* User Management */}

                {/* User Dropdown */}
          
              {/* End of User Management */}
                {/* Other dropdowns go here */}
                {/* Search Dropdown */}
              
                {/* Logout Button */}
                <hr/>

               

                <button type='submit' className='btn btn-outline-danger text-start border-0 mb-0 w-100 d-flex align-items-center justify-content-center' onClick={handleLogout}>
                <FaSignOutAlt className='me-2  dark-svg'/>Logout - Nsnemo
                </button>
                
                <div id='username' className='text-center mt-2 fw-bolder border border-secondary-subtle p-2 w-100 rounded-1 link '> Welcome : {username}</div>
                <div className="mt-2">
              <ClockToggle  />
                  </div>
                
              </div>
              
              </div>

        </>
  );
};

export default Sidebar;
