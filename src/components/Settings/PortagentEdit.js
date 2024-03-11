import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function PortAgentEdit() {
  const { portagentId } = useParams();
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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPortAgent();
  }, []);

  const fetchPortAgent = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-portagents/${portagentId}`);
      const fetchedPortAgent = response.data.portAgent;

      setFormData({
        portAgentName: fetchedPortAgent.portAgentName,
        contactPerson: fetchedPortAgent.contactPerson,
        address: fetchedPortAgent.address,
        phone: fetchedPortAgent.phone,
        email: fetchedPortAgent.email,
        city: fetchedPortAgent.city,
        state: fetchedPortAgent.state,
        country: fetchedPortAgent.country
      });
    } catch (error) {
      console.error('Error fetching port agent:', error);
      setErrorMessage('Failed to fetch port agent');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/others/update-port-agent/${portagentId}`, formData, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error updating port agent:', error);
      setErrorMessage('Failed to update port agent');
    }
  };

  return (
    <div className="p-5 overflow-scroll" style={{ height: '100vh' }}>
      <h4 className='mb-3'>Edit Portagent</h4>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
          <Button type="submit" variant="primary"> <CgCheck/> Save Changes</Button>
          <Link to={`/portagent-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

        </div>
      </Form>
    </div>
  );
}

export default PortAgentEdit;
