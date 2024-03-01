import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

function DocumentView() {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchDocuments(currentPage);
  }, [currentPage]);

  const fetchDocuments = async (page) => {
    try {
      // Perform GET request to fetch documents from the server
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/others/view-document?page=${page}&limit=${limit}`, {
        headers: { "Authorization": token }
      });
      // Update the state with the fetched documents and total pages
      setDocuments(response.data.documents);
      setTotalPages(Math.ceil(response.data.totalPages));
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='me-3 ms-3 overflow-scroll' style={{height:'100vh'}}>
      <div className="table-responsive text-center">
      <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none  text-bg-primary card p-4 mt-5 mb-0">Document Table</h4>
        <Table id="document-list" className='table  table-striped table-bordered text-center' style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Sno</th>
              <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Document Type</th>
              <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Hide Expiry Date</th>
              <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={document.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{document.documentType}</td>
                <td>{document.hideExpiryDate ? 'Yes' : 'No'}</td>
                <td className='p-0 m-0'>
                  <Link variant="link" className="p-0 me-2" style={{ color: 'blue' }}>
                    <FaPencilAlt size={10} />
                  </Link>
                  <Link variant="link" className="p-0" style={{ color: 'red' }}>
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
                  <MdFirstPage/>
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className=" border-0 page-link rounded-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <MdArrowBackIos size={10}/>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className=" border-0 page-link rounded-1"
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
    </div>
  );
}

export default DocumentView;
