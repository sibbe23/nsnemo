import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function CrewPlannerAdd() {
  return (
    <div style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }}>

    <Form id="addCrewForm">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="candidate_c_rank">
          <Form.Label>Rank</Form.Label>
          <Form.Select required>
            <option disabled selected>-- Select Rank --</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="client">
          <Form.Label>Client</Form.Label>
          <Form.Select required>
            <option disabled selected>-- Select Client --</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="vesseltype">
          <Form.Label>Vessel Type</Form.Label>
          <Form.Select required>
            <option disabled selected>-- Select Vessel Type --</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="vsl">
          <Form.Label>Vessel</Form.Label>
          <Form.Select required>
            <option disabled selected>-- Select Vessel --</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="cocAccepted">
          <Form.Label>COC Accepted</Form.Label>
          <Form.Select required>
            <option disabled selected>-- Select COC Accepted --</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="trading">
        <Form.Label>Trading:</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wages">
        <Form.Label>Wages:</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>

      <Row className="mb-3">
        <Form.Label column md={3}>Date of Joining:</Form.Label>
        <Col md={3} className="border rounded-2 pt-3 border-dark-subtle">
          <Form.Control type="date" id="doj" name="doj" />
        </Col>
        <Col xs={1} className="p-4">
          OR
        </Col>
        <Col md={3} className="border rounded-2 p-4 border-dark-subtle">
          <Form.Check type="checkbox" id="immediate" label="Immediate:" />
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="otherInfo">
        <Form.Label>Other Information:</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status:</Form.Label>
        <Form.Select required>
          <option disabled selected>-- Select Status --</option>
          <option value="position_open">Position Open</option>
          <option value="position_closed">Position Closed</option>
          <option value="closed_by_ns">Closed by NS</option>
          <option value="closed_by_client">Closed by Client</option>
        </Form.Select>
      </Form.Group>

      <div className="card-footer text-end pt-0 pe-0 pb-1">
        <Button type="submit" variant="primary">Add Crew Planner</Button>
      </div>
    </Form>
    </div>
  );
}

export default CrewPlannerAdd;
