import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

function Candidate_add({ darkMode }) {
  const [rankOptions, setRankOptions] = useState([]);
  const [natOptions, setNatOptions] = useState([]);
  const [vesselTypeOptions, setVesselTypeOptions] = useState([]);
  const [expOptions, setExpOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [licOptions, setLicOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async () => {
    try {
        // Construct the data object with all form inputs
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            rank: document.getElementById('rank').value,
            availability: document.getElementById('availability').value,
            nationality: document.getElementById('nationality').value,
            maritalStatus: document.getElementById('maritalStatus').value,
            dob: document.getElementById('dob').value,
            birthPlace: document.getElementById('birthPlace').value,
            workedWithUs: document.getElementById('workedWithUs').value,
            vesselType: document.getElementById('vesselType').value,
            experience: document.getElementById('experience').value,
            zone: document.getElementById('zone').value,
            grade: document.getElementById('grade').value,
            boilerSuitSize: document.getElementById('boilerSuitSize').value,
            safetyShoeSize: document.getElementById('safetyShoeSize').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            licenseCountry: document.getElementById('licenseCountry').value,
            indosNumber: document.getElementById('indosNumber').value,
            companyStatus: document.getElementById('companyStatus').value,
            group: document.getElementById('group').value,
            vendor: document.getElementById('vendor').value,
            nemoSource: document.getElementById('nemoSource').value,
            candidateActiveDetails: document.getElementById('candidateActiveDetails').value,
            candidateAreaCode1: document.getElementById('candidateAreaCode1').value,
            candidateAreaCode2: document.getElementById('candidateAreaCode2').value,
            candidateCategory: document.getElementById('candidateCategory').value,
            candidateCreatedBy: document.getElementById('candidateCreatedBy').value,
            candidateCreatedDate: document.getElementById('candidateCreatedDate').value,
            candidateCreatedTime: document.getElementById('candidateCreatedTime').value,
            candidateEditedBy: document.getElementById('candidateEditedBy').value,
            candidateImpDiscussion: document.getElementById('candidateImpDiscussion').value,
            candidateIpAddress: document.getElementById('candidateIpAddress').value,
            candidateJoinedDate: document.getElementById('candidateJoinedDate').value,
            candidateLastCompany: document.getElementById('candidateLastCompany').value,
            candidateLastSalary: document.getElementById('candidateLastSalary').value,
            candidateLastDate: document.getElementById('candidateLastDate').value,
            candidateLastTime: document.getElementById('candidateLastTime').value,
            candidateMobileCode1: document.getElementById('candidateMobileCode1').value,
            candidateMobileCode2: document.getElementById('candidateMobileCode2').value,
            candidateMobileStatus: document.getElementById('candidateMobileStatus').value,
            candidateOtherMobileCode: document.getElementById('candidateOtherMobileCode').value,
            candidateOtherNumbers: document.getElementById('candidateOtherNumbers').value,
            candidatePAd1: document.getElementById('candidatePAd1').value,
            candidatePAd2: document.getElementById('candidatePAd2').value,
            candidatePCountry: document.getElementById('candidatePCountry').value,
            candidatePMobi1: document.getElementById('candidatePMobi1').value,
            candidatePMobi2: document.getElementById('candidatePMobi2').value,
            candidatePRank: document.getElementById('candidatePRank').value,
            candidatePTel1: document.getElementById('candidatePTel1').value,
            candidatePTel2: document.getElementById('candidatePTel2').value,
            candidateRefCheck: document.getElementById('candidateRefCheck').value,
            candidateResumeUploadDate: document.getElementById('candidateResumeUploadDate').value,
            candidateSkype: document.getElementById('candidateSkype').value,
            candidateStcw: document.getElementById('candidateStcw').value,
            candidateVendorId: document.getElementById('candidateVendorId').value,
            // Add all other form fields here
        };

        // Send the form data to the server using Axios
        const response = await axios.post('your_api_endpoint', formData);

        // Handle the response as needed
        console.log('Response:', response.data);
    } catch (error) {
        // Handle errors
        console.error('Error submitting form:', error);
    }
};

  useEffect(() => {
    // Fetch options from the server
    fetchOptionsFromServer()
      .then((options) => {
        setRankOptions(options);
        setNatOptions(options);
        setVesselTypeOptions(options);
        setExpOptions(options);
        setGradeOptions(options);
        setLicOptions(options);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching options:', error);
        setIsLoading(false);
      });
  }, []);

  const fetchOptionsFromServer = async () => {
    // Perform API request to fetch options
    try {
      const response = await fetch('your_api_endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch options');
      }
      const data = await response.json();
      return data.options; // Assuming options are stored in a property named 'options'
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <Container className='border rounded-3 p-4 mt-5  card shadow-sm w-100 '>
      <Form onSubmit={handleSubmit}> {/* Attach handleSubmit to form's onSubmit event */}
        <h5 className=' card-title mb-4 '>Add Candidate</h5>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your Last name"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
        <Col>
      <FloatingLabel controlId="floatingSelect" label="Rank" className="mb-3">
        <Form.Select
          aria-label="Rank"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select Rank</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            rankOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col>

    <Col>
      <FloatingLabel controlId="floatingAvailability" label="Availability" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Select availability"
          className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
        />
      </FloatingLabel>
    </Col>
        </Row>
        <Row>
        <Col>
      <FloatingLabel controlId="floatingSelect" label="Nationality" className="mb-3">
        <Form.Select
          aria-label="Nationality"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select Nationality</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            natOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col>
    <Col>

          <FloatingLabel controlId="company_status" label="Marital Status" className="mb-3">
    <Form.Select
      aria-describedby="maritalStatusHelp"
      required
      className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
      disabled={isLoading}
    >
      <option>Select Marital Status</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
      <option value="Divorced">Divorced</option>
      <option value="Widow">Widow</option>
    </Form.Select>
    </FloatingLabel>

  </Col>

        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="candidate_dob"
              label="D.O.B"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your Birth date"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="candidate_birth_place" label="Birth Place">
              <Form.Control
                type="text"
                placeholder="Enter your Birth Place"
                className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
          <FloatingLabel controlId="candidate_work_nautilus" label="Worked with us" className="mb-3">
        <Form.Select
          aria-describedby="workedWithUsHelp"
          required
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option value="" disabled selected>Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Form.Select>
    </FloatingLabel>
          </Col>
          <Col>
      <FloatingLabel controlId="candidate_c_vessel" label="Vessel Type" className="mb-3">
        <Form.Select
          aria-label="Vessel Type"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select Vessel Type</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            vesselTypeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col> 
        </Row>
        <Row>
        <Col>
      <FloatingLabel controlId="candidate_experience" label="Experience" className="mb-3">
        <Form.Select
          aria-label="Experience"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select Experience</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            expOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col>
    <Col>
          <FloatingLabel controlId="candidate_zone" label="Zone" className="mb-3">
        <Form.Select
          aria-describedby="zoneHelp"
          required
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option value="" disabled selected>Select Option</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>

        </Form.Select>
    </FloatingLabel>
          </Col>
        </Row>
        <Row>
        <Col>
      <FloatingLabel controlId="candidate_grade" label="Grade" className="mb-3">
        <Form.Select
          aria-label="Grade"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select Grade</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            gradeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col>
          <Col>
            <FloatingLabel controlId="candidate_boiler_suit_size" label="Boiler Suit Size">
              <Form.Control
                type="text"
                placeholder="Enter your Boiler suit size"
                className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="candidate_safety_shoe_size"
              label="Safety Shoe Size"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your Safety Shoe size"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="candidate_height" label="Height">
              <Form.Control
                type="text"
                placeholder="Enter your height"
                className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="candidate_weight"
              label="Weight"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your weight"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
          <Col>
      <FloatingLabel controlId="candidate_I_country" label="License Country" className="mb-3">
        <Form.Select
          aria-label="License"
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option>Select License Country</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            licOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </Form.Select>
      </FloatingLabel>
    </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="candidate_indos_number"
              label="INDOS Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your indos number"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
                style={{border:'solid orange 2px'}}
              />
            </FloatingLabel>
          </Col>
          <Col>
          <FloatingLabel controlId="candidate_company_status" label="Company Status" className="mb-3">
              <Form.Select
          aria-describedby="companyStatusHelp"
          required
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option value="" disabled selected>Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Form.Select>
    </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
          <FloatingLabel controlId="candidate_group" label="Group" className="mb-3">
              <Form.Select
          aria-describedby="groupHelp"
          required
          className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
          disabled={isLoading}
        >
          <option value="" disabled selected>Select Option</option>
          <option value="Officer">Officer</option>
          <option value="Rating">Rating</option>
          <option value="IV crew">IV crew</option>
        </Form.Select>
    </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="candidate_vendor" label="Vendor">
              <Form.Control
                type="text"
                placeholder="Enter Vendor"
                className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="candidate_photos"
              label="Photo"
              className="mb-3"
            >
              <Form.Control
                type="file"
                placeholder="Select Photo"
                className={`bg-transparent ${darkMode ? 'text-white' : ''}`}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="candidate_resume" label="Resume">
              <Form.Control
                type="file"
                placeholder="Select Resume"
                className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}
              />
            </FloatingLabel>
          </Col>
        </Row>
        
      <h4>Primary Address</h4>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_ad1"
              placeholder="Address"
              required
            />
            <Form.Label htmlFor="candidate_c_ad1">Address</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_city"
              placeholder="City"
              required
            />
            <Form.Label htmlFor="candidate_city">City</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_state"
              placeholder="State"
              required
            />
            <Form.Label htmlFor="candidate_c_state">State</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_pin"
              placeholder="Pincode"
              required
            />
            <Form.Label htmlFor="candidate_pin">Pincode</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_mobi1"
              placeholder="Mobile"
              required
            />
            <Form.Label htmlFor="candidate_c_mobi1">Mobile</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_tel1"
              placeholder="Landline"
              required
            />
            <Form.Label htmlFor="candidate_c_tel1">Landline</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Floating>
            <Form.Control
                            className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="email"
              id="candidate_email1"
              placeholder="Email"
              style={{border:'solid orange 2px'}}

              required
            />
            <Form.Label htmlFor="candidate_email1">Email</Form.Label>
          </Form.Floating>
        </Col>
      </Row>

      <h4>Alternate Address</h4>
      <Row>
        <Col md={6} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_ad2"
              placeholder="Address"
              required
            />
            <Form.Label htmlFor="candidate_c_ad2">Address</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_p_city"
              placeholder="City"
              required
            />
            <Form.Label htmlFor="candidate_p_city">City</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_p_state"
              placeholder="State"
              required
            />
            <Form.Label htmlFor="candidate_p_state">State</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_p_pin"
              placeholder="Pincode"
              required
            />
            <Form.Label htmlFor="candidate_p_pin">Pincode</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_mobi2"
              placeholder="Mobile"
              required
            />
            <Form.Label htmlFor="candidate_c_mobi2">Mobile</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="text"
              id="candidate_c_tel2"
              placeholder="Landline"
              required
            />
            <Form.Label htmlFor="candidate_c_tel2">Landline</Form.Label>
          </Form.Floating>
        </Col>
        <Col md={6} className="mb-2">
          <Form.Floating>
            <Form.Control
                                        className={`bg-transparent ${darkMode ? 'dark-mode-text' : ''}`}

              type="email"
              id="candidate_email2"
              placeholder="Email"
              required
            />
            <Form.Label htmlFor="candidate_email2">Email</Form.Label>
          </Form.Floating>
        </Col>
      </Row>
      <div>
      <Form.Group controlId="nemo_source">
        <Form.Control type="hidden" placeholder="Enter Nemo Source" required />
      </Form.Group>
      <Form.Group controlId="candidate_active_details">
        <Form.Control type="hidden" placeholder="Enter active details" required />
      </Form.Group>
      <Form.Group controlId="candidate_area_code1">
        <Form.Control type="hidden" placeholder="Enter area code1" required />
      </Form.Group>
      <Form.Group controlId="candidate_area_code2">
        <Form.Control type="hidden" placeholder="Enter area code2" required />
      </Form.Group>
      <Form.Group controlId="candidate_category">
        <Form.Control type="hidden" placeholder="Enter category" required />
      </Form.Group>
      <Form.Group controlId="candidate_created_by">
        <Form.Control type="hidden" placeholder="Enter created by" required />
      </Form.Group>
      <Form.Group controlId="candidate_created_date">
        <Form.Control type="hidden" placeholder="Enter created date" required />
      </Form.Group>
      <Form.Group controlId="candidate_created_time">
        <Form.Control type="hidden" placeholder="Enter created time" required />
      </Form.Group>
      <Form.Group controlId="candidate_editedby">
        <Form.Control type="hidden" placeholder="Enter edited by" required />
      </Form.Group>
      <Form.Group controlId="candidate_imp_discussion">
        <Form.Control type="hidden" placeholder="Enter candidate imp discussion" required />
      </Form.Group>
      <Form.Group controlId="candidate_ipadress">
        <Form.Control type="hidden" placeholder="Enter candidate ipaddress" required />
      </Form.Group>
      <Form.Group controlId="candidate_joined_date">
        <Form.Control type="hidden" placeholder="Enter candidate joined date" required />
      </Form.Group>
      <Form.Group controlId="candidate_last_company">
        <Form.Control type="hidden" placeholder="Enter candidate last company" required />
      </Form.Group>
      <Form.Group controlId="candidate_last_salary">
        <Form.Control type="hidden" placeholder="Enter candidate last salary" required />
      </Form.Group>
      <Form.Group controlId="candidate_last_date">
        <Form.Control type="hidden" placeholder="Enter candidate last date" required />
      </Form.Group>
      <Form.Group controlId="candidate_last_time">
        <Form.Control type="hidden" placeholder="Enter candidate last time" required />
      </Form.Group>
      <Form.Group controlId="candidate_mobile_code1">
        <Form.Control type="hidden" placeholder="Enter candidate mobile code 1" required />
      </Form.Group>
      <Form.Group controlId="candidate_mobile_code2">
        <Form.Control type="hidden" placeholder="Enter candidate mobile code 2" required />
      </Form.Group>
      <Form.Group controlId="candidate_mobile_status">
        <Form.Control type="hidden" placeholder="Enter candidate mobile status" required />
      </Form.Group>
      <Form.Group controlId="candidate_other_mobile_code">
        <Form.Control type="hidden" placeholder="Enter candidate other mobile code" required />
      </Form.Group>
      <Form.Group controlId="candidate_other_numbers">
        <Form.Control type="hidden" placeholder="Enter candidate other numbers" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_ad1">
        <Form.Control type="hidden" placeholder="Enter candidate p ad1" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_ad2">
        <Form.Control type="hidden" placeholder="Enter candidate p ad2" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_country">
        <Form.Control type="hidden" placeholder="Enter candidate p country" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_mobi1">
        <Form.Control type="hidden" placeholder="Enter candidate p mobi1" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_mobi2">
        <Form.Control type="hidden" placeholder="Enter candidate p mobi2" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_rank">
        <Form.Control type="hidden" placeholder="Enter candidate p rank" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_tel1">
        <Form.Control type="hidden" placeholder="Enter candidate p tel1" required />
      </Form.Group>
      <Form.Group controlId="candidate_p_tel2">
        <Form.Control type="hidden" placeholder="Enter candidate p tel2" required />
      </Form.Group>
      <Form.Group controlId="candidate_ref_check">
        <Form.Control type="hidden" placeholder="Enter candidate ref check" required />
      </Form.Group>
      <Form.Group controlId="candidate_resume_upload_date">
        <Form.Control type="hidden" placeholder="Enter candidate resume upload date" required />
      </Form.Group>
      <Form.Group controlId="candidate_skype">
        <Form.Control type="hidden" placeholder="Enter candidate skype" required />
      </Form.Group>
      <Form.Group controlId="candidate_stcw">
        <Form.Control type="hidden" placeholder="Enter candidate stcw" required />
      </Form.Group>
      <Form.Group controlId="candidate_vendor_id">
        <Form.Control type="hidden" placeholder="Enter candidate vendor id" required />
      </Form.Group>
      </div>
      <div className='text-end'>
      <button type="submit" className="btn btn-primary  mt-3 shadow-lg rounded-2">ADD CANDIDATE</button> {/* Submit button */}
      
      </div>

</Form>
      </Container>
    </>
  );
}

export default Candidate_add;
