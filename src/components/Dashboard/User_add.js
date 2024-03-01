import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

function User_add() {
  return (
    <Container className="mt-3">
      <h1 className="text-center">User Form</h1>
      <Form id="user-form">
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="f_name">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="l_name">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="user_password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_c_password">
            <Form.Label>Confirm:</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="user_group">
            <Form.Label>Group:</Form.Label>
            <Form.Select defaultValue="" required>
              <option disabled>-- Select Role --</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_created_date">
            <Form.Label>Created By:</Form.Label>
            <Form.Control type="text" disabled placeholder="Enter Created By" required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="master_create">
            <Form.Label>Master:</Form.Label>
            <Form.Control type="text" disabled placeholder="Master Account" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <h5>Permissions</h5>
            <Form.Check type="checkbox" id="u_read_only" label="Read only" />
            <Form.Check type="checkbox" id="u_write" label="Write" />
            <Form.Check type="checkbox" id="u_import" label="Import" />
            <Form.Check type="checkbox" id="u_reports" label="Reports" />
          </Col>
          <Col md={6}>
            <Form.Check type="checkbox" id="u_export" label="Export" />
            <Form.Check type="checkbox" id="u_user_management" label="User management" />
            <Form.Check type="checkbox" id="u_vendor_management" label="Vendor management" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Check type="checkbox" id="disable_user" label="Disable User?" />
          </Col>
        </Row>
        <div className="text-end">
          <Button variant="success" type="submit">Add User</Button>
        </div>
      </Form>
    </Container>
  );
}

export default User_add;
