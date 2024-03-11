import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserView() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode JWT token
  const userId = decodedToken.userId; // Extract user ID from decoded token

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/view-user?page=${page}&limit=${limit}`, {
        headers: { "Authorization": token }
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:3000/user/delete-user/${userId}`);

      // Refresh the user list after deletion
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Error during delete request:', error.message);
    }
  };


  return (
    <div className='me-3 ms-3 overflow-scroll' style={{ height: '100vh' }}>
      <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5 mb-0">User Table</h4>
      <div className="table-responsive mt-0">
        <Table id="user-table" className='table table-striped table-bordered text-center' style={{ fontSize: '12px' }}>
          <thead className="bg-primary text-white">
            <tr>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>S.No</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>ID</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>First Name</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Last Name</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Email</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white col-1'>Password</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Phone</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Group</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Vendor</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Client</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Created By</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Master</th>
              <th scope='col' style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.lastName}</td>
                <td>{user.userEmail}</td>
                <td>{user.userPassword}</td>
                <td>{user.userPhone}</td>
                <td>{user.userGroup}</td>
                <td>{user.userVendor}</td>
                <td>{user.userClient}</td>
                <td>{user.createdBy}</td>
                <td>{user.master_create}</td>
                <td>
                <Link to={`/user-edit/${user.id}`} className="btn border-0 p-0 m-0" style={{ color: 'blue', transition: 'color 0.3s' }}>
                    <FaPencilAlt size={10} />
                  </Link>
                  {/* Render delete button only if userId is not the same */}
                  {userId !== user.id && (
                    <button
                      className="btn border-0 p-0 m-0 ms-2"
                      onClick={() => deleteUser(user.id)}
                      style={{ color: 'red', transition: 'color 0.3s' }}
                    >
                      <FaTrash size={10} />
                    </button>
                  )}
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
                <button className="border-0 page-link me-1 rounded-1" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  <MdFirstPage />
                </button>
              </li>
              <li className="page-item">
                <button className="border-0 page-link rounded-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <MdArrowBackIos size={10} />
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className="border-0 page-link rounded-1"
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
              <li className="page-item">
                <button className="border-0 page-link rounded-1 ms-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <MdArrowForwardIos size={10} />
                </button>
              </li>
              <li className="page-item">
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
        {/* End of Pagination */}
      </div>
    </div>
  );
}

export default UserView;
