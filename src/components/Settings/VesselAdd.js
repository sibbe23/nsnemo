import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function VesselForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vesselName = e.target.elements.vessel_name.value.trim();
    const token = localStorage.getItem('token');

    try {
      // Add a new vessel
      await axios.post("http://localhost:3000/others/create-vessel", { vesselName }, { headers: { "Authorization": token } });
      console.log('Vessel added successfully');
      // Reset the form after successful submission
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add vessel');
    }
  };

  return (
    <div className="p-5">
      <h4 className="mb-3">Vessel - Add</h4>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="vessel_name" className="col-form-label">Vessel Name:</Form.Label>
          <Col>
            <Form.Control type="text" id="vessel_name" placeholder="Enter vessel name" required />
          </Col>
        </Form.Group>
        <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Add Vessel</Button>
                <Link to={`/vessel-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
      </Form>
    </div>
  );
}

function VslForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('token');

    try {
      const serverResponse = await axios.post("http://localhost:3000/others/create-vsl", {
        vesselName: formData.get('vessel_name_vsl'),
        vesselType: formData.get('vessel_type'),
        vsl_company: formData.get('vsl_company'),
        imoNumber: formData.get('imo_number'),
        vesselFlag: formData.get('vessel_flag'),
      }, {
        headers: { "Authorization": token }
      });

      console.log('Response:', serverResponse.data);
      // Reset the form after successful submission
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add vessel type');
    }
  };

  return (
    <div className="p-5">
      <h4 className='mb-3'> Vessel Type - Add</h4>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="vessel_name_vsl">
          <Form.Label>Vessel Name:</Form.Label>
          <Form.Control type="text" name="vessel_name_vsl" placeholder='Enter Vessel Name' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="vessel_type">
          <Form.Label>Vessel Type:</Form.Label>
          <Form.Control type="text" name="vessel_type" placeholder='Enter Vessel Type' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="vsl_company">
          <Form.Label>Company:</Form.Label>
          <Form.Control type="text" name="vsl_company" placeholder='Enter Company name' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imo_number">
          <Form.Label>IMO Number:</Form.Label>
          <Form.Control type="text" name="imo_number" placeholder='Enter IMO number' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="vessel_flag">
          <Form.Label>Vessel Flag:</Form.Label>
          <Form.Control type="text" name="vessel_flag" placeholder='Enter Vessel Flag' required />
        </Form.Group>
        <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Add Vessel Type</Button>
                <Link to={`/vessel-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
      </Form>
    </div>
  );
}

function VesselAdd() {
  return (
    <Container>
      <Row>
        <Col>
          <VesselForm />
        </Col>
        <Col>
          <VslForm />
        </Col>
      </Row>
    </Container>
  );
}

export default VesselAdd;
