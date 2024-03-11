import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function User_add() {
  const [formData, setFormData] = useState({
    userName: '',
    lastName: '',
    userEmail: '',
    userPassword: '',
    userCPassword: '',
    userPhone: '',
    userGroup: 'admin', // Set default value to 'admin'
    userVendor: '',
    userClient: '',
    createdBy: '',
    master_create: '', // Initial value set to empty string
    disableUser: false,
    readOnly: false,
    Write: false,
    imports: false,
    exports: false,
    userManagement: false,
    vendorManagement: false,
    reports: false
  });


  useEffect(() => {
    // Decode the JWT token stored in localStorage to get user details
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const currentUserEmail = decodedToken.userEmail; // Get the email of the currently logged-in user from the token
    const currentUserMasterCreate = decodedToken.master_create; // Get the master_create value of the currently logged-in user from the token
    // Construct the new value of master_create by appending the current user's email and the fetched master_create value from the token
    const newValue = currentUserMasterCreate + ',' + currentUserEmail;

    // Set the formData with the updated master_create value and createdBy value
    setFormData(prevData => ({
      ...prevData,
      master_create: newValue,
      createdBy: currentUserEmail // Set createdBy field to currentUserEmail

      
    }));
  }, []); // Run this effect only once, after the initial render

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { userPassword, userCPassword } = formData;

    if (userPassword !== userCPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/create-user', formData);
      console.log(response.data);
      // Handle success response here
    } catch (error) {
      console.error('Error:', error);
      // Handle error response here
    }
  };

  return (
    <Container className="p-5">
      <h4 >User Form</h4>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="f_name">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="userName" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="l_name">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" name="lastName" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="userEmail" onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="user_password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" name="userPassword" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_c_password">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" name="userCPassword" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone" name="userPhone" onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="user_vendor">
            <Form.Label>Vendor:</Form.Label>
            <Form.Control type="text" placeholder="Enter vendor" name="userVendor" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={4} controlId="user_client">
            <Form.Label>Client:</Form.Label>
            <Form.Control type="text" placeholder="Enter client" name="userClient" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <h5>Permissions</h5>
            <Form.Check type="checkbox" id="u_read_only" label="Read only" name="readOnly" onChange={handleChange} />
            <Form.Check type="checkbox" id="u_write" label="Write" name="Write" onChange={handleChange} />
            <Form.Check type="checkbox" id="u_import" label="Import" name="imports" onChange={handleChange} />
            <Form.Check type="checkbox" id="u_reports" label="Reports" name="reports" onChange={handleChange} />
          </Col>
          <Col md={6}>
            <Form.Check type="checkbox" id="u_export" label="Export" name="exports" onChange={handleChange} />
            <Form.Check type="checkbox" id="u_user_management" label="User management" name="userManagement" onChange={handleChange} />
            <Form.Check type="checkbox" id="u_vendor_management" label="Vendor management" name="vendorManagement" onChange={handleChange} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Check type="checkbox" id="disable_user" label="Disable User?" name="disableUser" onChange={handleChange} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="user_created_date">
              <Form.Label>Created By:</Form.Label>
              <Form.Control type="text" disabled value={formData.createdBy} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="master_create">
              <Form.Label>Master:</Form.Label>
              <Form.Control type="text" disabled value={formData.master_create} required />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-end">
          <Button variant="primary" type="submit"> <CgCheck/>Add User</Button>
          <Link to={`/user-view`} className='btn btn-danger ms-2'><IoIosClose/> Cancel</Link>
        </div>
      </Form>
    </Container>
  );
}

export default User_add;
