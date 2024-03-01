import React from 'react';
import { Table } from 'react-bootstrap';

function UserView() {
  return (
    <div className="content-wrapper bg-white mt-3 rounded-3">
      <div className="w-100 mt-3">
        <div className="container">
          <h1 className="text-center">User Table</h1>
  
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
<th style={{ fontSize: '8px' }}>Sno</th>
<th style={{ fontSize: '8px' }}>ID</th>
<th style={{ fontSize: '8px' }}>First Name</th>
<th style={{ fontSize: '8px' }}>Last Name</th>
<th style={{ fontSize: '8px' }}>Email</th>
<th style={{ fontSize: '8px' }}>Password</th>
<th style={{ fontSize: '8px' }}>Phone</th>
<th style={{ fontSize: '8px' }}>Group</th>
<th style={{ fontSize: '8px' }}>Vendor</th>
<th style={{ fontSize: '8px' }}>Client</th>
<th style={{ fontSize: '8px' }}>Created By</th>
<th style={{ fontSize: '8px' }}>Master</th>
<th style={{ fontSize: '8px' }}>Active</th>
<th style={{ fontSize: '8px' }}>E/D</th>
</tr> 
              </thead>
              <tbody>
             
               
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
