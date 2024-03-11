import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function VesselTypeEdit() {
  const { vesselTypeId } = useParams();
  const [vesselTypeData, setVesselTypeData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchVesselTypeData();
  }, []);

  const fetchVesselTypeData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-vsl/${vesselTypeId}`);
      setVesselTypeData(response.data.vsl || {});
    } catch (error) {
      console.error('Error fetching vessel type data:', error);
      setErrorMessage('Failed to fetch vessel type data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:3000/others/update-vsl/${vesselTypeId}`, {
        vesselName: formData.get('vesselName'),
        vesselType: formData.get('vesselType'),
        vsl_company: formData.get('vsl_company'),
        imoNumber: formData.get('imoNumber'),
        vesselFlag: formData.get('vesselFlag')
      }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      fetchVesselTypeData(); // Fetch updated data after successful update
      // Optionally, you can redirect the user to another page
      // window.location.href = '/vessel-types';
    } catch (error) {
      console.error('Error updating vessel type:', error);
      setErrorMessage('Failed to update vessel type');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="p-5">
            <h4 className="mb-3">Vessel Type - Edit</h4>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="vesselName" className="col-form-label">Vessel Name:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="vesselName"
                    name="vesselName"
                    defaultValue={vesselTypeData.vesselName || ''}
                    placeholder="Enter vessel name"
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="vesselType" className="col-form-label">Vessel Type:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="vesselType"
                    name="vesselType"
                    defaultValue={vesselTypeData.vesselType || ''}
                    placeholder="Enter vessel type"
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="vsl_company" className="col-form-label">VSL Company:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="vsl_company"
                    name="vsl_company"
                    defaultValue={vesselTypeData.vsl_company || ''}
                    placeholder="Enter VSL company"
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="imoNumber" className="col-form-label">IMO Number:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="imoNumber"
                    name="imoNumber"
                    defaultValue={vesselTypeData.imoNumber || ''}
                    placeholder="Enter IMO number"
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="vesselFlag" className="col-form-label">Vessel Flag:</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    id="vesselFlag"
                    name="vesselFlag"
                    defaultValue={vesselTypeData.vesselFlag || ''}
                    placeholder="Enter vessel flag"
                    required
                  />
                </Col>
              </Form.Group>
              <div className="text-end">
                <Button type="submit" variant="primary"> <CgCheck/> Save Changes (Vessel Type)</Button>
                <Link to={`/vessel-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VesselTypeEdit;
