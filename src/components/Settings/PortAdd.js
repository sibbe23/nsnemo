import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function PortAdd() {
  const [portName, setPortName] = useState('');

  const handleInputChange = (event) => {
    setPortName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/others/create-port',
        { portName },
        { headers: { Authorization: token } }
      );
      console.log(response.data.message); // Log success message
      // Clear the input field after successful creation
      setPortName('');
    } catch (error) {
      console.error('Error creating port:', error);
      // Handle error cases, e.g., show error message to the user
    }
  };

  return (
    <Form id="port-form" className="card-body pb-0 p-5" onSubmit={handleSubmit}>
      <h4>Port - Add</h4>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="port_name" className="col-form-label">Port:</Form.Label>
        <Col>
          <Form.Control
            type="text"
            id="port_name"
            placeholder="Enter port name"
            value={portName}
            onChange={handleInputChange}
            required
          />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary"> <CgCheck/> Add Port</Button>
        <Link to={`/port-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

      </div>
    </Form>
  );
}

export default PortAdd;
