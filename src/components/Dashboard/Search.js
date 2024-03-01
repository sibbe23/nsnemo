import React from 'react';
import { Form, Button, Row, Col, InputGroup,FormControl,Container,Table } from 'react-bootstrap';

function Search() {
  return (
    <>    <Form id="search-form">
      <Row className="mb-3">
      <InputGroup className="w-50 mx-auto">
        <FormControl type="text" placeholder="Search..." id="search_input" className=' rounded-start-pill ' />
        <Button variant="primary" id="search_btn">Search Entire Database</Button>
      </InputGroup>
    </Row>
    <Row className='mb-3'>
        <Col>
          <Form.Label htmlFor="nemoId">Nemo Id</Form.Label>
          <Form.Control type="text" id="nemoId" />
        </Col>
        <Col>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control type="text" id="name" />
        </Col>
        <Col>
          <Form.Label htmlFor="rank">Rank</Form.Label>
          <Form.Select id="rank">
            <option disabled selected></option>
            {/* Options will be dynamically added using JavaScript */}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="vsl">Vessel</Form.Label>
          <Form.Select id="vsl">
            <option disabled selected></option>
            {/* Options will be dynamically added using JavaScript */}
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label htmlFor="experience">Experience</Form.Label>
          <Form.Select id="experience">
            <option disabled selected></option>
            {/* Options will be dynamically added using JavaScript */}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="grade">Grade</Form.Label>
          <Form.Select id="grade">
            <option disabled selected>-- Select Grade --</option>
            {/* Options will be dynamically added using JavaScript */}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="status">Status</Form.Label>
          <Form.Select id="status">
            <option value=""></option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="all">All</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="availableFrom">Available From</Form.Label>
          <Form.Control type="date" id="availableFrom" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label htmlFor="availableTo">Available To</Form.Label>
          <Form.Control type="date" id="availableTo" />
        </Col>
        <Col>
          <Form.Label htmlFor="license">License Country</Form.Label>
          <Form.Select id="license">
            <option disabled selected>-- Select Country --</option>
            {/* Options will be dynamically added using JavaScript */}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="zone">Zone</Form.Label>
          <Form.Select id="zone">
            <option value=""></option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north">North</option>
            <option value="south">South</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="documentNumber">Group</Form.Label>
          <Form.Select id="documentNumber">
            <option value="" selected></option>
            <option value="officer">Officer</option>
            <option value="rating">Rating</option>
            <option value="ivCrew">IV Crew</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <div className="text-end mt-3 mb-0 pb-0">
          <Button type="submit" variant="primary">Search</Button>
        </div>
      </Row>
    </Form>
     <Container className="p-3 mb-3 rounded-2 mt-3 ms-3 me-3">
     <h4>Search Results :</h4>
     <div className="table-responsive">
       <Table bordered size="sm" style={{ fontSize: '12px' }}>
         <thead>
           <tr>
             <th className="col-auto" style={{ fontSize: '8px' }}>Nemo ID</th>
             <th style={{ fontSize: '8px' }}>First Name</th>
             <th style={{ fontSize: '8px' }}>Last Name</th>
             <th style={{ fontSize: '8px' }}>Rank</th>
             <th style={{ fontSize: '8px' }}>Vessel</th>
             <th style={{ fontSize: '8px' }}>Mobile</th>
             <th style={{ fontSize: '8px' }}>Age</th>
             <th style={{ fontSize: '8px' }}>Source</th>
             <th style={{ fontSize: '8px' }}>Actions</th>
           </tr>
         </thead>
         <tbody id="table-body">
           {/* Sample data, replace with actual data from your server */}
           {/* Add more rows as needed */}
         </tbody>
       </Table>
     </div>
     <div id="result-container"></div>
   </Container>
   </>
  );
}

export default Search;
