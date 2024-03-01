import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import {  MdArrowBackIos, MdArrowForwardIos, MdFirstPage, MdLastPage } from "react-icons/md";
import { Link } from 'react-router-dom';

function CompanyView() {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of items per page
  const token = localStorage.getItem('token');

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }


  

  const deleteCompany = async (companyId) => {
    console.log("Deleting company with ID:", companyId);
    // Implement delete functionality here
    try {
      // Send delete request
      await axios.delete(`http://localhost:3000/company/delete-company/${companyId}`, {
        headers: { "Authorization": token }
      });
      // After deletion, refresh the company list
      fetchCompanies(currentPage);
    } catch (error) {
      console.error('Error during delete request:', error.message);
    }
  }

  const fetchCompanies = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/company/view-company?page=${page}&limit=${limit}`, {
        headers: { "Authorization": token }
      });
      setCompanies(response.data.company);
      setTotalPages(Math.ceil(response.data.totalPages));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateSNo = (index) => {
    return ((currentPage - 1) * limit) + index + 1;
  }

  return (
      <div className='me-3 ms-3 overflow-scroll' style={{height:'100vh'}} >
        <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none  text-bg-primary card p-4  mt-5 mb-0" >Company Table</h4>
        <div className="table-responsive mt-0" >
          <Table id="company-table" className='table table-striped table-bordered text-center ' style={{ fontSize: '12px' }}>
            <thead>
              <tr >
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>S.No</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>COMPANY ID</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>COMPANY NAME</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>BUSINESS TYPE</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>CONTACT</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>EMAIL</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>ADDRESS</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>MANAGEMENT</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>PHONE</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>LAST UPDATE</th>
                <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{calculateSNo(index)}</td>
                  <td>{company.company_id}</td>
                  <td>{company.company_name}</td>
                  <td>{company.b_type}</td>
                  <td>{company.contact_person}</td>
                  <td>{company.email}</td>
                  <td>{company.address}</td>
                  <td>{company.management}</td>
                  <td>{company.phone}</td>
                  <td>{formatDate(company.last_update)}</td>
                  <td className='p-0'>
                    <Link to={`/company-edit/${company.company_id}`} className="btn border-0 p-0 m-0" style={{ color: 'blue', transition: 'color 0.3s' }}>
                      <FaPencilAlt size={10} />
                    </Link>
                    <button
                      className="btn border-0 p-0 m-0 ms-2"
                      onClick={() => deleteCompany(company.company_id)}
                      style={{ color: 'red', transition: 'color 0.3s' }}
                    >
                      <FaTrash size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
          <div className="d-flex justify-content-start">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className=" border-0 page-link me-1 rounded-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    <MdFirstPage/>
                  </button>
                </li>
                <li className="page-item">
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
                <li className="page-item">
                  <button className="border-0 page-link rounded-1 ms-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <MdArrowForwardIos size={10}/>
                  </button>
                </li>
                <li className="page-item">
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

export default CompanyView;
