import React, { useState, useEffect } from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';


function ExpView() {
  const [experiences, setExperiences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchExperiences(currentPage);
  }, [currentPage]);

  const fetchExperiences = async (page) => {
    try {
      // Perform GET request to fetch experiences from the server
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/others/view-experience?page=${page}&limit=${limit}`, {
        headers: { "Authorization": token }
      });
      // Update the state with the fetched experiences and total pages
      setExperiences(response.data.experiences);
      setTotalPages(Math.ceil(response.data.totalPages));
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Card.Body className="pb-0 me-3 ms-3 overflow-scroll" style={{height:'100vh'}}>
      <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none  text-bg-primary card p-4 mt-5 mb-0">Experience Table</h4>
      <div className="table-responsive text-center">
        <Table id="exp-list" className='table table-striped table-bordered text-center' style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white col-1 '>Sno</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Experience</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white col-1 '>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{experience.experience}</td>
                <td className='p-0 m-0'>
                  <Button variant="link" className="p-0 me-2" style={{ color: 'blue' }}>
                    <FaPencilAlt size={10} />
                  </Button>
                  <Button variant="link" className="p-0" style={{ color: 'red' }}>
                    <FaTrash size={10} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-start">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="border-0 page-link me-1 rounded-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  <MdFirstPage/>
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="border-0 page-link rounded-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <MdArrowBackIos size={10}/>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className="border-0 page-link rounded-1"
                    onClick={() => handlePageChange(page)}
                    style={{
                      border:'0px',
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
                  <MdArrowForwardIos size={10}/>
                </button>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="border-0 page-link rounded-1 ms-1" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                  <MdLastPage/>
                </button>
              </li>
            </ul>
          </nav>
          <div className="mt-1 pt-1 ms-2 text-center text-md-start">
            <p className="m-0">Showing {currentPage} of {totalPages} pages</p>
          </div>
        </div>
      </div>
    </Card.Body>
  );
}

export default ExpView;
