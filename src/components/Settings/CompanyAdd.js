import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

function CompanyAdd() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    c_name: '',
    b_type: '',
    c_contact: '',
    c_email: '',
    c_addr: '',
    c_mgmt: '',
    c_ph: '',
    c_last_update: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:3000/company/create-company", formData, {
        headers: {
          "Authorization": token
        }
      });

      console.log('Response:', response.data);
      alert("Company Added Successfully!");
      // Reset the form after successful submission
      setFormData({
        c_name: '',
        b_type: '',
        c_contact: '',
        c_email: '',
        c_addr: '',
        c_mgmt: '',
        c_ph: '',
        c_last_update: ''
      });
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="p-5 overflow-y-auto d-flex justify-content-center " style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100 ">
        <h4 className='mb-3 '>Company Add</h4>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="c_name" value={formData.c_name} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Business Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="FMS"
                type="radio"
                id="fms"
                name="b_type"
                value="FMS"
                onChange={handleChange}
                checked={formData.b_type === 'FMS'}
                required
              />
              <Form.Check
                inline
                label="FPP"
                type="radio"
                id="fpp"
                name="b_type"
                value="FPP"
                onChange={handleChange}
                checked={formData.b_type === 'FPP'}
                required
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_contact">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control type="text" name="c_contact" value={formData.c_contact} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="c_addr" value={formData.c_addr} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="c_email" value={formData.c_email} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_phone">
            <Form.Label>Phone No</Form.Label>
            <Form.Control type="tel" name="c_ph" value={formData.c_ph} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_management">
            <Form.Label>Management Type</Form.Label>
            <Form.Select name="c_mgmt" value={formData.c_mgmt} onChange={handleChange} required>
              <option value="" disabled>Select Management Type</option>
              <option value="Owners">Owners</option>
              <option value="Managers">Managers</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_last_update">
            <Form.Label>Last Update</Form.Label>
            <Form.Control type="date" name="c_last_update" value={formData.c_last_update} onChange={handleChange} required />
          </Form.Group>
        </Row>

        <div className="text-end  pb-5">
          <Button type="submit" variant="primary">Add Company</Button>
        </div>
      </Form>
    </div>
  );
}

export default CompanyAdd;
