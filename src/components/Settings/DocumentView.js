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

  const handleDeleteDocument = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this document?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/others/delete-document/${id}`, {
        headers: { "Authorization": token }
      });

      if (response.data.success) {
        // If document deleted successfully, fetch documents again to update the list
        fetchDocuments(currentPage);
      } else {
        console.error('Failed to delete document');
        // Optionally, you can show an error message to the user here
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div className='me-3 ms-3 overflow-scroll' style={{ height: '100vh' }}>
      <div className="table-responsive text-center">
        <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5 mb-0">Document Table</h4>
        <Table id="document-list" className='table table-striped table-bordered text-center' style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white'>Sno</th>
              <th scope="col" style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white'>Document Type</th>
              <th scope="col" style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white'>Hide Expiry Date</th>
              <th scope="col" style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={document.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{document.documentType}</td>
                <td>{document.hideExpiryDate ? 'Yes' : 'No'}</td>
                <td className='p-0 m-0'>
                <Link to={`/doc-edit/${document.id}`}><FaPencilAlt className='m-1' style={{ color: 'blue', cursor: 'pointer' }} size={10} /></Link>

                  <Button variant="link" className="p-0" style={{ color: 'red' }} onClick={() => handleDeleteDocument(document.id)}>
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
                <button className=" border-0 page-link me-1 rounded-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  <MdFirstPage />
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className=" border-0 page-link rounded-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <MdArrowBackIos size={10} />
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
                  <MdArrowForwardIos size={10} />
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

export default DocumentView;
