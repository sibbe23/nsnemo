import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function HospitalAdd() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('token');

    try {
      const serverResponse = await axios.post("http://localhost:3000/others/create-hospital", {
        hospitalName: formData.get('hospital_name'),
        doctorName: formData.get('doctor_name'),
        doctorAddress: formData.get('doctor_address'),
        doctorCity: formData.get('doctor_city'),
        doctorState: formData.get('doctor_state'),
        doctorPhone: formData.get('doctor_phone'),
        doctorEmail: formData.get('doctor_email'),
        doctorUpload: formData.get('doctor_upload'),
      }, {
        headers: { "Authorization": token }
      });

      console.log('Response:', serverResponse.data);
      // Reset the form after successful submission
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add hospital');
    }
  };

  return (
    <div className="p-5">
      <h4 className='mb-3'>Hospital - Add</h4>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="hospital_name">
          <Form.Label>Hospital Name:</Form.Label>
          <Form.Control type="text" name="hospital_name" placeholder='Enter Hospital Name' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_name">
          <Form.Label>Doctor Name:</Form.Label>
          <Form.Control type="text" name="doctor_name" placeholder='Enter Doctor Name' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_address">
          <Form.Label>Doctor Address:</Form.Label>
          <Form.Control type="text" name="doctor_address" placeholder='Enter Doctor Address' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_city">
          <Form.Label>Doctor City:</Form.Label>
          <Form.Control type="text" name="doctor_city" placeholder='Enter Doctor City' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_state">
          <Form.Label>Doctor State:</Form.Label>
          <Form.Control type="text" name="doctor_state" placeholder='Enter Doctor State' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_phone">
          <Form.Label>Doctor Phone:</Form.Label>
          <Form.Control type="text" name="doctor_phone" placeholder='Enter Doctor Phone' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_email">
          <Form.Label>Doctor Email:</Form.Label>
          <Form.Control type="email" name="doctor_email" placeholder='Enter Doctor Email' required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="doctor_upload">
          <Form.Label>Doctor Upload:</Form.Label>
          <Form.Control type="text" name="doctor_upload" placeholder='a file will come here' required />
        </Form.Group>
        <div className="text-end">
          <Button type="submit" variant="primary"> <CgCheck/> Add Hospital</Button>
          <Link to={`/hospital-view`} className='btn btn-danger ms-2'><IoIosClose/> Cancel</Link>

        </div>
      </Form>
    </div>
  );
}

export default HospitalAdd;