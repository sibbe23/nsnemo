import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas } from 'bootstrap';
import { BsList } from 'react-icons/bs'; // Hamburger icon

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

  const [companyOpen, setCompanyOpen] = useState(false);

  const toggleCompany = () => {
    setCompanyOpen(!companyOpen);
  };

  return (
    <>
      {/* Hamburger icon button */}
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <BsList />
      </button>
      <div className={`offcanvas offcanvas-start ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{width: '200px'}}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Nsnemo</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {/* Sidebar Content */}
          <button type="button" className="btn btn-secondary mb-2 d-block w-100" onClick={toggleCompany}>
            Company
          </button>
          {companyOpen && (
            <div className="company-buttons">
              <button type="button" className="btn btn-secondary mb-2 d-block w-100">Add</button>
              <button type="button" className="btn btn-secondary d-block w-100">List</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
