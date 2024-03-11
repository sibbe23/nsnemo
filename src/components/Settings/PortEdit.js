import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function PortEdit() {
  const { portId } = useParams();
  const [portName, setPortName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPort();
  }, []);

  const fetchPort = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-port/${portId}`);
      const fetchedPort = response.data.port;
      setPortName(fetchedPort.portName);
    } catch (error) {
      console.error('Error fetching port:', error);
      setErrorMessage('Failed to fetch port');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/others/update-port/${portId}`, { portName }, {
        headers: { Authorization: token }
      });
      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error updating port:', error);
      setErrorMessage('Failed to update port');
    }
  };

  return (
    <Form id="port-form" className="card-body pb-0 p-5" onSubmit={handleSubmit}>
      <h4>Port - Edit</h4>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="port_name" className="col-form-label">Port:</Form.Label>
        <Col>
          <Form.Control
            type="text"
            id="port_name"
            placeholder="Enter port name"
            value={portName}
            onChange={(e) => setPortName(e.target.value)}
            required
          />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary"> <CgCheck/> Save Changes</Button>
        <Link to={`/port-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

      </div>
    </Form>
  );
}

export default PortEdit;
