import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function PortAdd() {
  return (
    <Form id="port-form" className="card-body pb-0 p-5">
      <h4>Port - Add</h4>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="port_name" className=" col-form-label">Port:</Form.Label>
        <Col >
          <Form.Control type="text" id="port_name" placeholder="Enter port name" required />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary">Add Port</Button>
      </div>
    </Form>
  );
}

export default PortAdd;
