import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function UserEdit() {
  const { userId } = useParams();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    userName: '',
    lastName: '',
    userEmail: '',
    userPassword: '',
    userCPassword: '',
    userPhone: '',
    userGroup: 'admin',
    userVendor: '',
    userClient: '',
    createdBy: '',
    master_create: '',
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/get-user/${userId}`, { headers: { "Authorization": token } });
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId, token]);

  useEffect(() => {
    // Decode the JWT token stored in localStorage to get user details
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
  }, [token]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/user/update-user/${userId}`, formData, {
        headers: { "Authorization": token }
      });
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container className="mt-3">
      <h1 className="text-center">Edit User</h1>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="userName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="userCPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="userCPassword" value={formData.userCPassword} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="userPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="userPhone" value={formData.userPhone} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="userVendor">
            <Form.Label>Vendor</Form.Label>
            <Form.Control type="text" name="userVendor" value={formData.userVendor} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="userClient">
            <Form.Label>Client</Form.Label>
            <Form.Control type="text" name="userClient" value={formData.userClient} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <h5>Permissions</h5>
            <Form.Check type="checkbox" id="readOnly" label="Read only" name="readOnly" checked={formData.readOnly} onChange={handleChange} />
            <Form.Check type="checkbox" id="Write" label="Write" name="Write" checked={formData.Write} onChange={handleChange} />
            <Form.Check type="checkbox" id="imports" label="Import" name="imports" checked={formData.imports} onChange={handleChange} />
            <Form.Check type="checkbox" id="exports" label="Export" name="exports" checked={formData.exports} onChange={handleChange} />
          </Col>
          <Col md={6}>
            <Form.Check type="checkbox" id="userManagement" label="User management" name="userManagement" checked={formData.userManagement} onChange={handleChange} />
            <Form.Check type="checkbox" id="vendorManagement" label="Vendor management" name="vendorManagement" checked={formData.vendorManagement} onChange={handleChange} />
            <Form.Check type="checkbox" id="reports" label="Reports" name="reports" checked={formData.reports} onChange={handleChange} />
            <Form.Check type="checkbox" id="disableUser" label="Disable User?" name="disableUser" checked={formData.disableUser} onChange={handleChange} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="createdBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control type="text" name="createdBy" value={formData.createdBy} disabled />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="master_create">
              <Form.Label>Master Create</Form.Label>
              <Form.Control type="text" name="master_create" value={formData.master_create} disabled />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-end">
          <Button variant="primary" type="submit"> <CgCheck/> Save Changes</Button>
          <Link to={`/user-view`} className='btn btn-danger ms-2'><IoIosClose/> Cancel</Link>
        </div>
      </Form>
    </Container>
  );
}

export default UserEdit;
