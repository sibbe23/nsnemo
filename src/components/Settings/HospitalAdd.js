import React from 'react';
import { Form, Button } from 'react-bootstrap';

function HospitalAdd() {
  return (
    <div className="p-5 overflow-scroll" style={{height:'100vh'}}>
      <h4 className='mb-3'>Add Hospital</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Hospital Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter hospital name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Doctor Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter doctor name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter address" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" placeholder="Enter city" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State:</Form.Label>
          <Form.Control type="text" placeholder="Enter state" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="text" placeholder="Enter phone" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Upload:</Form.Label>
          <Form.Control type="file" required />
        </Form.Group>
        <div className="text-end mb-3">
          <Button type="submit" variant="primary">ADD HOSPITAL</Button>
        </div>
      </Form>
    </div>
  );
}

export default HospitalAdd;
