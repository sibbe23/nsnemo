import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function PortAgentAdd() {
  const [formData, setFormData] = useState({
    portAgentName: '',
    contactPerson: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/others/create-port-agent', formData, {
        headers: { "Authorization": token }
      });
      console.log(response.data.message);
      // Clear form fields after successful submission
      setFormData({
        portAgentName: '',
        contactPerson: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: ''
      });
    } catch (error) {
      console.error('Error creating port agent:', error);
      // Handle error cases, e.g., show error message to the user
    }
  };

  return (
    <div className="p-5 overflow-scroll" style={{height:'100vh'}}>
      <h4 className='mb-3'>Add Portagent</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="portAgentName">
          <Form.Label>Agent Name:</Form.Label>
          <Form.Control type="text" name="portAgentName" value={formData.portAgentName} onChange={handleChange} placeholder="Enter agent name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="contactPerson">
          <Form.Label>Contact Person:</Form.Label>
          <Form.Control type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Enter contact person" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State:</Form.Label>
          <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country:</Form.Label>
          <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" required />
        </Form.Group>
        <div className="text-end mb-3">
          <Button type="submit" variant="primary"> <CgCheck/> Add Port Agent</Button>
          <Link to={`/portagent-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

        </div>
      </Form>
    </div>
  );
}

export default PortAgentAdd;
