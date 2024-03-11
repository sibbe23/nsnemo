import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios if you're making HTTP requests
import { CgCheck } from 'react-icons/cg';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

function NkdAdd() {
  const [kinName, setKinName] = useState('');
  const [kinRelation, setKinRelation] = useState('');
  const [kinContactNumber, setKinContactNumber] = useState('');
  const [kinContactAddress, setKinContactAddress] = useState('');
  const [kinPriority, setKinPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your backend to add the NKD data
    try {
      await axios.post(`http://localhost/others/kin-details/${1}`, {
        kin_name: kinName,
        kin_relation: kinRelation,
        kin_contact_number: kinContactNumber,
        kin_contact_address: kinContactAddress,
        kin_priority: kinPriority
      });
      // Handle successful submission, like showing a success message or redirecting
    } catch (error) {
      // Handle errors, like displaying an error message
      console.error('Error adding NKD:', error);
    }
  };

  return (
    <div className="container p-5">
      <h1>Add NKD</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mt-2' controlId="kinName">
          <Form.Label>Kin Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter kin name"
            value={kinName}
            onChange={(e) => setKinName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="kinRelation">
          <Form.Label>Kin Relation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter kin relation"
            value={kinRelation}
            onChange={(e) => setKinRelation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="kinContactNumber">
          <Form.Label>Kin Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter kin contact number"
            value={kinContactNumber}
            onChange={(e) => setKinContactNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="kinContactAddress">
          <Form.Label>Kin Contact Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter kin contact address"
            value={kinContactAddress}
            onChange={(e) => setKinContactAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="kinPriority">
          <Form.Label>Kin Priority</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter kin priority"
            value={kinPriority}
            onChange={(e) => setKinPriority(e.target.value)}
          />
        </Form.Group>
        <div className='text-end mt-3'>
        <Button variant="primary" type="submit"><CgCheck/> 
          Add NKD
        </Button>
        <Link to={`/nkd-view`} className='btn btn-danger ms-2'><IoIosClose/> Cancel</Link>
        </div>
      </Form>
    </div>
  );
}

export default NkdAdd;
