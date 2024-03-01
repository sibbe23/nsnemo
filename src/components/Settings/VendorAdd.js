import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function VendorAdd() {
  return (
    <div className="mt-0 p-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 pe-0 ps-0 me-0 ms-0">Add Vendor</h5>
      </div>
      <Form id="addVendorForm">
        <Form.Group className="mb-3 row" controlId="vendorName">
          <Form.Label className=" col-form-label">Vendor Name:</Form.Label>
          <Col >
            <Form.Control type="text" name="vendorName" required />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row" controlId="vendorAddress">
          <Form.Label className=" col-form-label">Vendor Address:</Form.Label>
          <Col>
            <Form.Control type="text" name="vendorAddress" required />
          </Col>
        </Form.Group>
        <div className="text-end">
          <Button type="submit" variant="primary" className="mt-3" id="addVendorButton">Add Vendor</Button>
        </div>
      </Form>
    </div>
  );
}

export default VendorAdd;
