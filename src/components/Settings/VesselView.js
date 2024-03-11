import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

function VesselView() {
  const [showFirstTable, setShowFirstTable] = useState(true);
  const [vessels, setVessels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (showFirstTable) {
      displayVessels(currentPage, limit);
    } else {
      displayVesselTypes(currentPage, limit);
    }
  }, [currentPage, showFirstTable]);

  const displayVessels = async (page, limit) => {
    try {
      const response = await axios.get(`http://localhost:3000/others/view-vessels?page=${page}&limit=${limit}`, { headers: { "Authorization": localStorage.getItem('token') } });
      setVessels(response.data.vessels);
      setTotalPages(Math.ceil(response.data.totalPages));
    } catch (error) {
      console.error('Error fetching vessels:', error);
    }
  };

  const displayVesselTypes = async (page, limit) => {
    try {
      const response = await axios.get(`http://localhost:3000/others/view-vsl?page=${page}&limit=${limit}`, { headers: { "Authorization": localStorage.getItem('token') } });
      setVessels(response.data.vsls);
      setTotalPages(Math.ceil(response.data.totalPages));
    } catch (error) {
      console.error('Error fetching vessel types:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteVessel = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vessel?');
    if (confirmDelete) {
      try {
        const endpoint = showFirstTable ? `delete-vessels/${id}` : `delete-vsl/${id}`;
        const response = await axios.delete(`http://localhost:3000/others/${endpoint}`, { headers: { "Authorization": localStorage.getItem('token') } });
        
        if (response.data.success) {
          // After successful deletion, refresh the vessel list
          if (showFirstTable) {
            displayVessels(currentPage, limit);
          } else {
            displayVesselTypes(currentPage, limit);
          }
        } else {
          console.error('Error deleting vessel:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting vessel:', error);
      }
    }
  };
  
  

  return (
    <div className='ms-3 me-3 overflow-scroll' style={{height:'100vh'}}>
      <h4 className="text-center mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5  mb-0 ">
        {showFirstTable ? 'Vessel Table' : 'Vessel Type Table'}
      </h4>
      <div className="table-responsive text-center mb-4">
        <Table className="table table-striped table-bordered" style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1 '>Sno</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>
                {showFirstTable ? 'Vessel Name' : 'Vessel Type'}
              </th>
              {!showFirstTable && (
                <>
                  <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>
                    Company
                  </th>
                  <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>
                    IMO Number
                  </th>
                  <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>
                    Flag
                  </th>
                </>
              )}
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1 '>Actions</th>
            </tr>
          </thead>
          <tbody id="vessel-list">
            {vessels.map((vessel, index) => (
              <tr key={vessel.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{showFirstTable ? vessel.vesselName : vessel.vesselType}</td>
                {!showFirstTable && (
                  <>
                    <td>{vessel.vsl_company}</td>
                    <td>{vessel.imoNumber}</td>
                    <td>{vessel.vesselFlag}</td>
                  </>
                )}
                <td>
                  {showFirstTable ? (
                    <Link to={`/vessel-edit/${vessel.id}`}><FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} size={10} /></Link>
                  ) : (
                    <Link to={`/vessel-type-edit/${vessel.id}`}><FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} size={10} /></Link>
                  )}
                  <FaTrash style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} size={10} onClick={() => deleteVessel(vessel.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-start">
           <nav aria-label="Page navigation example">
             <ul className="pagination">
               <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                 <button className=" border-0 page-link me-1 rounded-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                   <MdFirstPage />
                 </button>
               </li>
               <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                 <button className=" border-0 page-link rounded-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                   <MdArrowBackIos size={15} />
                 </button>
               </li>
               {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                 <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                   <button
                     className=" border-0 page-link rounded-1"
                     onClick={() => handlePageChange(page)}
                     style={{
                       border: '0px',
                       marginLeft: '3px',
                       backgroundColor: currentPage === page ? '#696CFF' : 'white',
                       color: currentPage === page ? 'white' : 'black',
                     }}
                   >
                     {page}
                   </button>
                 </li>
               ))}
               <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                 <button className="border-0 page-link rounded-1 ms-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                   <MdArrowForwardIos size={15} />
                 </button>
               </li>
               <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="border-0 page-link rounded-1 ms-1" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                   <MdLastPage />
                 </button>
               </li>
             </ul>
           </nav>
           <div className="mt-1 pt-1 ms-2 text-center text-md-start">
             <p className="m-0">Showing {currentPage} of {totalPages} pages</p>
           </div>
         </div>
       </div>

        
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => setShowFirstTable(!showFirstTable)}>
          {showFirstTable ? 'Show Vessel Type Table' : 'Show Vessel Table'}
        </button>
      </div>
    </div>
  );
}

export default VesselView;
