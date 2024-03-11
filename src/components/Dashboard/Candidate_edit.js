import React, { useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

function CandidateEdit({ darkMode, candidateData }) {
  const [candidate, setCandidate] = useState(candidateData);

  const handleSubmit = async () => {
    try {
      const response = await axios.put('your_api_endpoint', candidate);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <Container className='border rounded-3 p-4 mt-5 card shadow-sm w-100'>
      <Form onSubmit={handleSubmit}>
        <h5 className='card-title mb-4'>Edit Candidate</h5>
        <Row>
          <Col>
            <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.firstName}
                onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.lastName}
                onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel controlId="rank" label="Rank" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.rank}
                onChange={(e) => setCandidate({ ...candidate, rank: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="availability" label="Availability" className="mb-3">
              <Form.Control
                type="date"
                value={candidate.availability}
                onChange={(e) => setCandidate({ ...candidate, availability: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Add more rows for the remaining input fields */}
        {/* Row 3 */}
        <Row>
          <Col>
            <FloatingLabel controlId="nationality" label="Nationality" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.nationality}
                onChange={(e) => setCandidate({ ...candidate, nationality: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="maritalStatus" label="Marital Status" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.maritalStatus}
                onChange={(e) => setCandidate({ ...candidate, maritalStatus: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 4 */}
        <Row>
          <Col>
            <FloatingLabel controlId="dob" label="Date of Birth" className="mb-3">
              <Form.Control
                type="date"
                value={candidate.dob}
                onChange={(e) => setCandidate({ ...candidate, dob: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="birthPlace" label="Birth Place" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.birthPlace}
                onChange={(e) => setCandidate({ ...candidate, birthPlace: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Add more rows for the remaining input fields */}
        {/* Row 5 */}
        <Row>
          <Col>
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control
                type="email"
                value={candidate.email}
                onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="phoneNumber" label="Phone Number" className="mb-3">
              <Form.Control
                type="tel"
                value={candidate.phoneNumber}
                onChange={(e) => setCandidate({ ...candidate, phoneNumber: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 6 */}
        <Row>
          <Col>
            <FloatingLabel controlId="address" label="Address" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.address}
                onChange={(e) => setCandidate({ ...candidate, address: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="city" label="City" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.city}
                onChange={(e) => setCandidate({ ...candidate, city: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 7 */}
        <Row>
          <Col>
            <FloatingLabel controlId="state" label="State" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.state}
                onChange={(e) => setCandidate({ ...candidate, state: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="zipCode" label="Zip Code" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.zipCode}
                onChange={(e) => setCandidate({ ...candidate, zipCode: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 8 */}
        <Row>
          <Col>
            <FloatingLabel controlId="country" label="Country" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.country}
                onChange={(e) => setCandidate({ ...candidate, country: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="linkedin" label="LinkedIn" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.linkedin}
                onChange={(e) => setCandidate({ ...candidate, linkedin: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 9 */}
        <Row>
          <Col>
            <FloatingLabel controlId="github" label="GitHub" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.github}
                onChange={(e) => setCandidate({ ...candidate, github: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="website" label="Website" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.website}
                onChange={(e) => setCandidate({ ...candidate, website: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 10 */}
        <Row>
          <Col>
            <FloatingLabel controlId="portfolio" label="Portfolio" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.portfolio}
                onChange={(e) => setCandidate({ ...candidate, portfolio: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="resume" label="Resume" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.resume}
                onChange={(e) => setCandidate({ ...candidate, resume: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 11 */}
        <Row>
          <Col>
            <FloatingLabel controlId="salary" label="Salary" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.salary}
                onChange={(e) => setCandidate({ ...candidate, salary: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="currency" label="Currency" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.currency}
                onChange={(e) => setCandidate({ ...candidate, currency: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 12 */}
        <Row>
          <Col>
            <FloatingLabel controlId="noticePeriod" label="Notice Period" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.noticePeriod}
                onChange={(e) => setCandidate({ ...candidate, noticePeriod: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="visaStatus" label="Visa Status" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.visaStatus}
                onChange={(e) => setCandidate({ ...candidate, visaStatus: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 13 */}
        <Row>
          <Col>
            <FloatingLabel controlId="education" label="Education" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.education}
                onChange={(e) => setCandidate({ ...candidate, education: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="experience" label="Experience" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.experience}
                onChange={(e) => setCandidate({ ...candidate, experience: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 14 */}
        <Row>
          <Col>
            <FloatingLabel controlId="skills" label="Skills" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.skills}
                onChange={(e) => setCandidate({ ...candidate, skills: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="languages" label="Languages" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.languages}
                onChange={(e) => setCandidate({ ...candidate, languages: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 15 */}
        <Row>
          <Col>
            <FloatingLabel controlId="references" label="References" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.references}
                onChange={(e) => setCandidate({ ...candidate, references: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="additionalInfo" label="Additional Info" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.additionalInfo}
                onChange={(e) => setCandidate({ ...candidate, additionalInfo: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 16 */}
        <Row>
          <Col>
            <FloatingLabel controlId="customField1" label="Custom Field 1" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField1}
                onChange={(e) => setCandidate({ ...candidate, customField1: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="customField2" label="Custom Field 2" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField2}
                onChange={(e) => setCandidate({ ...candidate, customField2: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 17 */}
        <Row>
          <Col>
            <FloatingLabel controlId="customField3" label="Custom Field 3" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField3}
                onChange={(e) => setCandidate({ ...candidate, customField3: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="customField4" label="Custom Field 4" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField4}
                onChange={(e) => setCandidate({ ...candidate, customField4: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 18 */}
        <Row>
          <Col>
            <FloatingLabel controlId="customField5" label="Custom Field 5" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField5}
                onChange={(e) => setCandidate({ ...candidate, customField5: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="customField6" label="Custom Field 6" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField6}
                onChange={(e) => setCandidate({ ...candidate, customField6: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 19 */}
        <Row>
          <Col>
            <FloatingLabel controlId="customField7" label="Custom Field 7" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField7}
                onChange={(e) => setCandidate({ ...candidate, customField7: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="customField8" label="Custom Field 8" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField8}
                onChange={(e) => setCandidate({ ...candidate, customField8: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Row 20 */}
        <Row>
          <Col>
            <FloatingLabel controlId="customField9" label="Custom Field 9" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField9}
                onChange={(e) => setCandidate({ ...candidate, customField9: e.target.value })}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="customField10" label="Custom Field 10" className="mb-3">
              <Form.Control
                type="text"
                value={candidate.customField10}
                onChange={(e) => setCandidate({ ...candidate, customField10: e.target.value })}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Add more rows for the remaining custom fields */}
        {/* Submit Button */}
        <div className='text-end'>
          <button type='submit' className='btn btn-primary'>Save Changes</button>
        </div>
      </Form>
    </Container>
  );
}

export default CandidateEdit;
