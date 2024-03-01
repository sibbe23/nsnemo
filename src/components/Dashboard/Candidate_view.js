import React from 'react';
import { Table } from 'react-bootstrap';

function Candidate_view() {
  return (
    <div className="content-wrapper bg-white mt-3 rounded-3">
      <div className="w-100 mt-3">
        <div className="container">
          <h1 className="text-center">Candidate Table</h1>
  
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Nemo ID</th>
                  <th>Full Name</th>
                  <th>Rank</th>
                  <th>Vessel</th>
                  <th>Mobile</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Add rows for individual candidates */}
                <tr>
                  <td>1</td>
                  <td>123456</td>
                  <td>John Doe</td>
                  <td>Captain</td>
                  <td>Ship A</td>
                  <td>123-456-7890</td>
                  <td>35</td>
                  <td>...</td>
                </tr>
               
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate_view;
