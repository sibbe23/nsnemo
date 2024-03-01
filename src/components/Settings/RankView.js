import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdLastPage, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';

function RankView() {
  const [ranks, setRanks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    displayRank(currentPage, limit);
  }, [currentPage]);

  const displayRank = async (page, limit) => {
    try {
      // Fetch ranks from the server with pagination parameters
      const rankResponse = await axios.get(`http://localhost:3000/others/view-rank?page=${page}&limit=${limit}`, { headers: { "Authorization": localStorage.getItem('token') } });
      setRanks(rankResponse.data.ranks);
      setTotalPages(Math.ceil(rankResponse.data.totalPages));
    } catch (error) {
      console.error('Error fetching ranks:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const editRank = (id, rank, rankOrder, category) => {
    // Implement edit functionality here
  };

  const deleteRank = (id) => {
    // Implement delete functionality here
  };

  return (
    <div className="table-responsive text-center me-3 ms-3 overflow-scroll" style={{height:'100vh'}}>
      <h4 className="text-center mb-0 rounded-0 shadow-none text-bg-primary card p-4 mt-5 mb-0 " >Rank Table</h4>
      <Table id="rank-list" className="table table-striped table-bordered" style={{ fontSize: '12px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1 '>Sno</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white  '>Rank</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white  '>Rank Order</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white  '>Category</th>
            <th style={{ backgroundColor: 'orange', border: 'orange solid 2px' }} className='p-1 text-white col-1 '>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((rank, index) => (
            <tr key={rank.id}>
              <td>{(currentPage - 1) * limit + index + 1}</td>
              <td>{rank.rank}</td>
              <td>{rank.rankOrder}</td>
              <td>{rank.category}</td>
              <td>
                
                <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} size={10} onClick={() => editRank(rank.id, rank.rank, rank.rankOrder, rank.category)} />
                <FaTrash style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} size={10} onClick={() => deleteRank(rank.id)} />
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

export default RankView;
