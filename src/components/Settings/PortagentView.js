import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

function PortAgentView() {
  const [portAgents, setPortAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    displayPortagent(currentPage, limit);
  }, [currentPage]);

  const displayPortagent = async (page, limit) => {
    try {
      // Fetch port agents from the server with pagination parameters
      const portAgentResponse = await axios.get(`http://localhost:3000/others/view-port-agent?page=${page}&limit=${limit}`, { headers: { "Authorization": localStorage.getItem('token') } });
      setPortAgents(portAgentResponse.data.portAgents);
      setTotalPages(Math.ceil(portAgentResponse.data.totalPages));
    } catch (error) {
      console.error('Error fetching port agents:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const editPortAgent = (id, portAgentName, contactPerson, address, phone, email, city, state, country) => {
    // Implement edit functionality here
  };

  const deletePortAgent = async (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this port agent?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/others/delete-port-agent/${id}`, {
        headers: { "Authorization": token }
      });
      if (response.data.success) {
        // If delete operation was successful, update the port agents list
        displayPortagent(currentPage, limit);
      } else {
        console.error('Error deleting port agent:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting port agent:', error);
    }
  };

  return (
    <div className='me-3 ms-3 overflow-scroll' style={{ height: '100vh' }}>
      <div className="table-responsive text-center" style={{ height: '100vh' }}>
        <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5 mb-0">Port Agent Table</h4>
        <Table id="port-agent-list" className="table  table-striped table-bordered" style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Sno</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Port Agent</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Contact Person</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Address</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>City</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>State</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Phone</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Email</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Country</th>
              <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white '>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portAgents.map((portAgent, index) => (
              <tr key={portAgent.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{portAgent.portAgentName}</td>
                <td>{portAgent.contactPerson}</td>
                <td>{portAgent.address}</td>
                <td>{portAgent.city}</td>
                <td>{portAgent.state}</td>
                <td>{portAgent.phone}</td>
                <td>{portAgent.email}</td>
                <td>{portAgent.country}</td>
                <td>
                <Link to={`/portagent-edit/${portAgent.id}`}><FaPencilAlt className='m-1' style={{ color: 'blue', cursor: 'pointer' }} size={10} onClick={() => editPortAgent(portAgent.id)} /></Link>

                  <Link to="#" className="p-0 me-2" style={{ color: 'red' }} onClick={() => deletePortAgent(portAgent.id)}>
                    <FaTrash size={10} />
                  </Link>
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
    </div>
  );
}

export default PortAgentView;
