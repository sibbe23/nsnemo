import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function GradeEdit() {
  const { gradeId } = useParams();
  const [grade, setGrade] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGrade();
  }, []);

  const fetchGrade = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-grade/${gradeId}`);
      setGrade(response.data.grade.gradeExp); // Assuming `gradeExp` is the correct property to set
    } catch (error) {
      console.error('Error fetching grade:', error);
      setErrorMessage('Failed to fetch grade');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:3000/others/update-grade/${gradeId}`, {
        gradeExp: grade // Corrected the property name to match the server-side
      }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      fetchGrade(); // Fetch updated data after successful update
    } catch (error) {
      console.error('Error updating grade:', error);
      setErrorMessage('Failed to update grade');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="p-5">
            <h4 className="mb-3">Grade - Edit</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="grade" className="col-form-label">Grade:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="grade"
                    name="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Enter grade"
                    required
                  />
                </Col>
              </Form.Group>
              <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Save Changes</Button>
                <Link to={`/grade-view`} className='btn btn-danger ms-2'> <IoIosClose/>Cancel</Link>

              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GradeEdit;
