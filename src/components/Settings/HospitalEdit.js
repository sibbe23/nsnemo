import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function HospitalEdit() {
  const { hospitalId } = useParams();
  const [formData, setFormData] = useState({
    hospitalName: '',
    doctorName: '',
    doctorAddress: '',
    doctorCity: '',
    doctorState: '',
    doctorPhone: '',
    doctorEmail: '',
    doctorUpload: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-hospital/${hospitalId}`);
      const fetchedHospital = response.data.hospital;

      setFormData({
        hospitalName: fetchedHospital.hospitalName,
        doctorName: fetchedHospital.doctorName,
        doctorAddress: fetchedHospital.doctorAddress,
        doctorCity: fetchedHospital.doctorCity,
        doctorState: fetchedHospital.doctorState,
        doctorPhone: fetchedHospital.doctorPhone,
        doctorEmail: fetchedHospital.doctorEmail,
        doctorUpload: fetchedHospital.doctorUpload
      });
    } catch (error) {
      console.error('Error fetching hospital:', error);
      setErrorMessage('Failed to fetch hospital');
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
      const response = await axios.put(`http://localhost:3000/others/update-hospital/${hospitalId}`, formData, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error updating hospital:', error);
      setErrorMessage('Failed to update hospital');
    }
  };

  return (
    <div className="p-5">
      <h4 className='mb-3'>Edit Hospital</h4>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="hospitalName">
          <Form.Label>Hospital Name:</Form.Label>
          <Form.Control type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder="Enter hospital name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorName">
          <Form.Label>Doctor Name:</Form.Label>
          <Form.Control type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} placeholder="Enter doctor name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorAddress">
          <Form.Label>Doctor Address:</Form.Label>
          <Form.Control type="text" name="doctorAddress" value={formData.doctorAddress} onChange={handleChange} placeholder="Enter doctor address" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorCity">
          <Form.Label>Doctor City:</Form.Label>
          <Form.Control type="text" name="doctorCity" value={formData.doctorCity} onChange={handleChange} placeholder="Enter doctor city" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorState">
          <Form.Label>Doctor State:</Form.Label>
          <Form.Control type="text" name="doctorState" value={formData.doctorState} onChange={handleChange} placeholder="Enter doctor state" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorPhone">
          <Form.Label>Doctor Phone:</Form.Label>
          <Form.Control type="text" name="doctorPhone" value={formData.doctorPhone} onChange={handleChange} placeholder="Enter doctor phone" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorEmail">
          <Form.Label>Doctor Email:</Form.Label>
          <Form.Control type="email" name="doctorEmail" value={formData.doctorEmail} onChange={handleChange} placeholder="Enter doctor email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctorUpload">
          <Form.Label>Doctor Upload:</Form.Label>
          <Form.Control type="text" name="doctorUpload" value={formData.doctorUpload} onChange={handleChange} placeholder="Enter doctor upload" required />
        </Form.Group>
        <div className="text-end">
          <Button type="submit" variant="primary"> <CgCheck/> Save Changes</Button>
          <Link to={`/hospital-view`} className='btn btn-danger ms-2'><IoIosClose/> Cancel</Link>

        </div>
      </Form>
    </div>
  );
}

export default HospitalEdit;
