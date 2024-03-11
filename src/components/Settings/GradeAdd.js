import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function GradeAdd() {
  const [gradeExp, setGradeExp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/others/create-grade', { gradeExp }, {
        headers: { Authorization: token }
      });

      console.log('Grade creation response:', response.data);
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error('Error creating grade:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <Form id="grade-form" className="card-body pb-0 p-5" onSubmit={handleSubmit}>
      <h4>Grade - Add</h4>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="grade_exp" className="col-form-label">Grade</Form.Label>
        <Col>
          <Form.Control
            type="text"
            id="grade_exp"
            placeholder="Enter grade"
            value={gradeExp}
            onChange={(e) => setGradeExp(e.target.value)}
            required
          />
        </Col>
      </Form.Group>
      <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Add Grade</Button>
                <Link to={`/grade-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
    </Form>
  );
}

export default GradeAdd;
