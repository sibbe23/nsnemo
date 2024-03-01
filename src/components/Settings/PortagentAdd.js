import React from 'react';
import { Form, Button } from 'react-bootstrap';

function PortAgentAdd() {
  return (
    <div className="p-5 overflow-scroll" style={{height:'100vh'}}>
      <h4 className='mb-3'>Add Portagent</h4>
      <Form>
        <Form.Group className="mb-3" controlId="portAgentName">
          <Form.Label>Agent Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter agent name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentContact">
          <Form.Label>Contact Person:</Form.Label>
          <Form.Control type="text" placeholder="Enter contact person" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter address" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="text" placeholder="Enter phone" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentCity">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" placeholder="Enter city" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentState">
          <Form.Label>State:</Form.Label>
          <Form.Control type="text" placeholder="Enter state" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portAgentCountry">
          <Form.Label>Country:</Form.Label>
          <Form.Control type="text" placeholder="Enter country" required />
        </Form.Group>
        <div className="text-end mb-3">
          <Button type="submit" variant="primary">ADD AGENT</Button>
        </div>
      </Form>
    </div>
  );
}

export default PortAgentAdd;
