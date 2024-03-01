import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

function RankAdd() {
  return (
    <Form id="rank-form" className="card-body pb-0 p-5">
      <h4>Rank - Add</h4>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="rank" className=" col-form-label">Rank:</Form.Label>
        <Col >
          <Form.Control type="text" id="rank" placeholder="Enter rank" required />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="rank_order" className=" col-form-label">Rank Order:</Form.Label>
        <Col >
          <Form.Control type="text" id="rank_order" placeholder="Enter rank order" required />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="category" className=" col-form-label">Category:</Form.Label>
        <Col>
          <Form.Control type="text" id="category" placeholder="Enter category" required />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary">ADD RANK</Button>
      </div>
    </Form>
  );
}

export default RankAdd;
