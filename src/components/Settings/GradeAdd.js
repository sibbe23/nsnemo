import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function GradeAdd() {
  return (
    <Form id="grade-form" className="card-body pb-0 p-5">
            <h4>Grade - Add</h4>

      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="grade_exp" className=" col-form-label">Grade</Form.Label>
        <Col>
          <Form.Control type="text" id="grade_exp" placeholder="Enter grade" required />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary">Add Grade</Button>
      </div>
    </Form>
  );
}

export default GradeAdd;
