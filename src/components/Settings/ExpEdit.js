import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function ExpEdit() {
  const { expId } = useParams();
  const [experience, setExperience] = useState({ experience: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-experience/${expId}`);
      setExperience(response.data.experience || { experience: '' });
    } catch (error) {
      console.error('Error fetching experience:', error);
      setErrorMessage('Failed to fetch experience');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:3000/others/update-experience/${expId}`, {
        experience: experience.experience
      }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      fetchExperience(); // Fetch updated data after successful update
    } catch (error) {
      console.error('Error updating experience:', error);
      setErrorMessage('Failed to update experience');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="p-5">
            <h4 className="mb-3">Experience - Edit</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="experience" className="col-form-label">Experience:</Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    id="experience"
                    name="experience"
                    value={experience.experience}
                    onChange={(e) => setExperience({ ...experience, experience: e.target.value })}
                    placeholder="Enter experience"
                    required
                  />
                </Col>
              </Form.Group>
              <div className="text-end">
                <Button type="submit" variant="primary" > <CgCheck/> Save Changes</Button>
                <Link to={`/exp-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ExpEdit;
