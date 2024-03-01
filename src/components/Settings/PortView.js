import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';

function PortView() {
  const [ports, setPorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    displayPort(currentPage, limit);
  }, [currentPage]);

  const displayPort = async (page, limit) => {
    try {
      // Fetch ports from the server with pagination parameters
      const portResponse = await axios.get(`http://localhost:3000/others/view-port?page=${page}&limit=${limit}`, { headers: { "Authorization": localStorage.getItem('token') } });
      setPorts(portResponse.data.ports);
      setTotalPages(Math.ceil(portResponse.data.totalPages));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const editPort = (id, portName) => {
    // Implement edit functionality here
  };

  const deletePort = (id) => {
    // Implement delete functionality here
  };

  return (
    <div className="table-responsive text-center  me-3 ms-3 overflow-scroll" style={{height:'100vh'}}>
      <h4 className="text-center mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5 mb-0 ">Port Table</h4>
      <Table id="port-list" className="table table-striped table-bordered" style={{ fontSize: '12px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1 '>Sno</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Port Name</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1'>Actions</th>
          </tr>
        </thead>
        <tbody id="port-table">
          {ports.map((port, index) => (
            <tr key={port.id}>
              <td>{(currentPage - 1) * limit + index + 1}</td>
              <td>{port.portName}</td>
              <td>
                <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} size={10} onClick={() => editPort(port.id, port.portName)} />
                <FaTrash style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} size={10} onClick={() => deletePort(port.id)} />
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
  );
}

export default PortView;
