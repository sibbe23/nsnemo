import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function VesselEdit() {
  const { vesselId } = useParams();
  const [vesselData, setVesselData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch vessel data based on ID when component mounts
    fetchVesselData();
  }, []);

  const fetchVesselData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-vessel/${vesselId}`);
      setVesselData(response.data.vessel);
    } catch (error) {
      console.error('Error fetching vessel data:', error);
      setErrorMessage('Failed to fetch vessel data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:3000/others/update-vessels/${vesselId}`, {
        vesselName: formData.get('vessel_name')
      }, {
        headers: { "Authorization": token }
      });
      console.log('Response:', response.data);
      // Redirect to vessel page after successful update
    } catch (error) {
      console.error('Error updating vessel:', error);
      setErrorMessage('Failed to update vessel');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="p-5">
            <h4 className="mb-3">Vessel - Edit</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="vessel_name" className="col-form-label">Vessel Name:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="vessel_name"
                    name="vessel_name"
                    defaultValue={vesselData.vesselName || ''}
                    placeholder="Enter vessel name"
                    required
                  />
                </Col>
              </Form.Group>
              <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Save Changes (Vessel)</Button>
                <Link to={`/vessel-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VesselEdit;
