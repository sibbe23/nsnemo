import React from 'react';
import { Table, Col } from 'react-bootstrap';

function VendorView() {
  return (
    <div className="table-responsive text-center">
      <Table id="vendor-table" className="table table-sm table-bordered table-striped" style={{ fontSize: '12px' }}>
        <thead>
          <tr>
            <th className="col-1" style={{ fontSize: '8px' }}>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Vendor Address</th>
            <th className="col-1" style={{ fontSize: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody id="vendor-list">
          {/* You can map through your vendor data here to populate the table rows */}
        </tbody>
      </Table>
      <div id="pagination-controls"></div>
    </div>
  );
}

export default VendorView;
