import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function ExpAdd() {
  const [experience, setExperience] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/others/create-experience', { experience }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error creating experience:', error);
      // Handle error states accordingly
    }
  };

  return (
    <div className="p-5 overflow-y-auto" style={{ height: '100vh' }}>
      <Form id="exp-form" onSubmit={handleSubmit}>
        <h4 className='mb-3'>Experience - Add</h4>
        <Form.Group className="mb-3 row" controlId="exp">
          <Form.Label>Experience</Form.Label>
          <Col>
            <Form.Control 
              type="text" 
              placeholder="Enter experience" 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required 
            />
          </Col>
        </Form.Group>
        <div className="text-end">
                <Button type="submit" variant="primary" > <CgCheck/> Add Experience</Button>
                <Link to={`/exp-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
      </Form>
    </div>
  );
}

export default ExpAdd;
