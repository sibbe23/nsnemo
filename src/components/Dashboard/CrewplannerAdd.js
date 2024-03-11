// CrewPlannerAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Table, Badge, FloatingLabel } from 'react-bootstrap';

function CrewPlannerAdd() {
  const [rankOptions, setRankOptions] = useState([]);
  const [natOptions, setNatOptions] = useState([]);
  const [vesselTypeOptions, setVesselTypeOptions] = useState([]);
  const [vesselOptions, setVesselOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [crewPlanner, setCrewPlanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    rank: '',
    client: '',
    vesselType: '',
    vesselName: '',
    cocAccepted: '',
    trading: '',
    wages: '',
    doj: '',
    otherInfo: '',
    status: '',
    immediate: false // new state for checkbox
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOptionsFromServer();
    fetchCrewPlanner();
  }, [currentPage]);

  const fetchOptionsFromServer = async () => {
    try {
      const [
        rankResponse,
        natResponse,
        vesselTypeResponse,
        vesselResponse,
        companyResponse,
      ] = await Promise.all([
        axios.get("http://localhost:3000/others/view-rank", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/fetch-nationality", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/others/view-vsl", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/others/view-vessels", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/company/view-company", {
          headers: { Authorization: token },
        }),
      ]);

      setRankOptions(rankResponse.data.ranks);
      setNatOptions(natResponse.data.countries);
      setVesselTypeOptions(vesselTypeResponse.data.vsls);
      setVesselOptions(vesselResponse.data.vessels);
      setCompanyOptions(companyResponse.data.company);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setIsLoading(false);
    }
  };

  const fetchCrewPlanner = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/others/view-crew-planner?page=${page}`, {
        headers: { "Authorization": token }
      });
      setCrewPlanner(response.data.crewplanners);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    // If immediate is checked, set doj to "Immediate"
    const dojValue = id === 'immediate' && checked ? 'Immediate' : value;
  
    setFormData({ ...formData, [id]: val, doj: dojValue });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchCrewPlanner();
      setFormData({
        rank: '',
        client: '',
        vesselType: '',
        vesselName: '',
        cocAccepted: '',
        trading: '',
        wages: '',
        doj: '',
        otherInfo: '',
        status: '',
        immediate: false
      });
      setLoading(false);
      await axios.post('http://localhost:3000/others/add-crew-planner', formData, {
        headers: { "Authorization": token }
      });
      fetchCrewPlanner()
     
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }} className='p-5'>
      <Form id="addCrewForm" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="rank" label="Rank" className="mb-3">
              <Form.Select aria-label="Rank" value={formData.rank} onChange={handleInputChange} disabled={isLoading}>
                <option>Select Rank</option>
                {rankOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.rank}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Group controlId="client">
              <Form.Label>Client</Form.Label>
              <Form.Select value={formData.client} onChange={handleInputChange} disabled={isLoading}>
                <option disabled value="">-- Select Client --</option>
                {companyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.company_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="vesselType">
              <Form.Label>Vessel Type</Form.Label>
              <Form.Select value={formData.vesselType} onChange={handleInputChange} disabled={isLoading}>
                <option disabled value="">-- Select Vessel Type --</option>
                {vesselTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.vesselName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="vesselName">
              <Form.Label>Vessel</Form.Label>
              <Form.Select value={formData.vesselName} onChange={handleInputChange} disabled={isLoading}>
                <option disabled value="">-- Select Vessel --</option>
                {vesselOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.vesselName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="cocAccepted" label="cocAccepted" className="mb-3">
              <Form.Select aria-label="cocAccepted" value={formData.nationality} onChange={handleInputChange} disabled={isLoading}>
                <option>Select Nationality</option>
                {natOptions.map((country, index) => (
                  <option key={index} value={country.id}>
                    {country.country}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="trading">
              <Form.Label>Trading:</Form.Label>
              <Form.Control type="text" value={formData.trading} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wages">
              <Form.Label>Wages:</Form.Label>
              <Form.Control type="text" value={formData.wages} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="otherInfo">
              <Form.Label>Other Information:</Form.Label>
              <Form.Control type="text" value={formData.otherInfo} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="status">
              <Form.Label>Status:</Form.Label>
              <Form.Select value={formData.status} onChange={handleInputChange} required>
                <option disabled value="">-- Select Status --</option>
                <option value="position_open">Position Open</option>
                <option value="position_closed">Position Closed</option>
                <option value="closed_by_ns">Closed by NS</option>
                <option value="closed_by_client">Closed by Client</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="doj">
              <Form.Label>Date of Joining:</Form.Label>
              <Form.Control type="date" value={formData.doj} onChange={handleInputChange} required={!formData.immediate} disabled={formData.immediate} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Immediate"
                id="immediate"
                checked={formData.immediate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="card-footer text-end pt-0 pe-0 pb-1">
          <Button type="submit" variant="primary">Add Crew Planner</Button>
        </div>
      </Form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <h2>Existing Crew Planner</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rank</th>
                <th>Client</th>
                <th>Vessel Type</th>
                <th>Vessel Name</th>
                <th>COC accepted</th>
                <th>Trading</th>
                <th>Wages</th>
                <th>Date of Joining</th>
                <th>Other Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {crewPlanner.map((crew, index) => (
                <tr key={index}>
                  <td>{crew.id}</td>
                  <td>{crew.rank}</td>
                  <td>{crew.client}</td>
                  <td>{crew.vesselType}</td>
                  <td>{crew.vesselName}</td>
                  <td>{crew.cocAccepted}</td>
                  <td>{crew.trading}</td>
                  <td>{crew.wages}</td>
                  <td>{crew.doj}</td>
                  <td>{crew.otherInfo}</td>
                  <td>
                    {crew.status === "position_open" && (
                      <Badge bg="success">Position Open</Badge>
                    )}
                    {crew.status === "position_closed" && (
                      <Badge bg="danger">Position Closed</Badge>
                    )}
                    {crew.status === "closed_by_ns" && (
                      <Badge bg="warning">Closed by NS</Badge>
                    )}
                    {crew.status === "closed_by_client" && (
                      <Badge bg="info">Closed by Client</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination">
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
            <span>{currentPage} / {totalPages}</span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrewPlannerAdd;
