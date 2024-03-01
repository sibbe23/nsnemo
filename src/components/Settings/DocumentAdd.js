import React from 'react';
import { Form, Button } from 'react-bootstrap';

function DocumentAdd() {
  return (
    <Form className='p-5'>
      <h4 className='mb-3' >Document - Add</h4>
      <Form.Group className="mb-3" controlId="documentName">
        <Form.Label>Document Name</Form.Label>
        <Form.Control type="text" placeholder="Enter document name" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="hideExpiry">
        <Form.Check type="checkbox" label="Hide Expiry?" />
      </Form.Group>
      <div className="text-end">
        <Button type="submit" variant="primary">Add Document</Button>
      </div>
    </Form>
  );
}

export default DocumentAdd;
