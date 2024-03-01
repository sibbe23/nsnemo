import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function ExpAdd() {
  return (
    <div className="p-5 overflow-y-auto" style={{ height: '100vh' }}>
      <Form id="exp-form">
        <h4 className='mb-3'>Experience - Add</h4>
        <Form.Group className="mb-3 row" controlId="exp">
          <Form.Label>Experience</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter experience" required />
          </Col>
        </Form.Group>
        <div className="text-end mb-3">
          <Button type="submit" variant="primary">Add Experience</Button>
        </div>
      </Form>
    </div>
  );
}

export default ExpAdd;
