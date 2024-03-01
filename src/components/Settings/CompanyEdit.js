import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CompanyEdit() {
  const { companyId } = useParams();
  const token = localStorage.getItem('token');

  const [fetchedCompanyData, setFetchedCompanyData] = useState({
    company_name: '',
    b_type: '',
    contact_person: '',
    address: '',
    email: '',
    phone: '',
    management: '',
    last_update: ''
  });

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  const [formData, setFormData] = useState({
    company_name: '',
    b_type: '',
    contact_person: '',
    address: '',
    email: '',
    phone: '',
    management: '',
    last_update: ''
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/company/get-company/${companyId}`, { headers: { "Authorization": token } });
        setFetchedCompanyData(response.data.company);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchCompanyData();
  }, [companyId, token]);

  useEffect(() => {
    setFormData({
      company_name: fetchedCompanyData.company_name || '',
      b_type: fetchedCompanyData.b_type || '',
      contact_person: fetchedCompanyData.contact_person || '',
      address: fetchedCompanyData.address || '',
      email: fetchedCompanyData.email || '',
      phone: fetchedCompanyData.phone || '',
      management: fetchedCompanyData.management || '',
      last_update: fetchedCompanyData.last_update || ''
    });
  }, [fetchedCompanyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await axios.put(`http://localhost:3000/company/update-company/${companyId}`, formData, {
        headers: { "Authorization": token }
      });
      console.log('Company updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  return (
    <div className="p-5 overflow-y-auto d-flex justify-content-center" style={{ height: '100vh' }}>
      <Form id="company-form" className="w-100" onSubmit={handleSubmit}>
        <h4 className='mb-3'>Edit Company</h4>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="company_name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              placeholder="Enter Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
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
                checked={formData.b_type === "FMS"}
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                label="FPP"
                type="radio"
                id="fpp"
                name="b_type"
                value="FPP"
                checked={formData.b_type === "FPP"}
                onChange={handleChange}
                required
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="contact_person">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              name="contact_person"
              placeholder="Enter Contact Person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="management">
            <Form.Label>Management</Form.Label>
            <Form.Control
              type="text"
              name="management"
              placeholder="Enter Management Type"
              value={formData.management}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="last_update">
            <Form.Label>Last Update</Form.Label>
            <Form.Control
              type="date"
              name="last_update"
              value={formatDate(formData.last_update)}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <div className="text-end pb-5">
          <Button type="submit" variant="primary">Edit Company</Button>
        </div>
      </Form>
    </div>
  );
}

export default CompanyEdit;
