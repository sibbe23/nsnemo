import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

function Candidate_add({ darkMode }) {
  const [rankOptions, setRankOptions] = useState([]);
  const [natOptions, setNatOptions] = useState([]);
  const [vesselTypeOptions, setVesselTypeOptions] = useState([]);
  const [expOptions, setExpOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    c_rank: "",
    avb_date: "",
    nationality: "",
    m_status: "",
    dob: "",
    birth_place: "",
    work_nautilus: "",
    c_vessel: "",
    experience: "",
    zone: "",
    grade: "",
    boiler_suit_size: "",
    safety_shoe_size: "",
    height: "",
    weight: "",
    I_country: "",
    indos_number: "",
    company_status: "",
    group: "",
    vendor: "",
    nemo_source: "",
    active_details: "",
    area_code1: "",
    area_code2: "",
    category: "",
    createdBy: "",
    cr_date: "",
    cr_time: "",
    editedBy: "",
    imp_discussion: "",
    ipaddress: "",
    joined_date: "",
    last_company: "",
    last_salary: "",
    las_date: "",
    las_time: "",
    mobile_code1: "",
    mobile_code2: "",
    p_ad1: "",
    p_ad2: "",
    p_country: "",
    p_mobi1: "",
    p_mobi2: "",
    p_rank: "",
    p_tel1: "",
    p_tel2: "",
    ref_check: "",
    resume: "",
    skype: "",
    stcw: "",
    email1: "",
    email2: "",
    other_mobile_code: "",
    other_numbers: "",
    photos: "",
    p_city: "",
    p_pin: "",
    p_state: "",
    vendor_id: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send the form data to the server using Axios
      const response = await axios.post(
        "http://localhost:3000/candidate/add-candidate",
        formData,
        { headers: { Authorization: token } }
      );

      // Handle the response as needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  const token = localStorage.getItem("token");
  const fetchOptionsFromServer = async () => {
    try {
      const [
        rankResponse,
        natResponse,
        vesselTypeResponse,
        expResponse,
        gradeResponse,
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
        axios.get("http://localhost:3000/others/view-experience", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/others/view-grade", {
          headers: { Authorization: token },
        }),
      ]);
      console.log(
        rankResponse.data,
        natResponse.data,
        vesselTypeResponse.data,
        expResponse.data,
        gradeResponse.data
      );
      setRankOptions(rankResponse.data);
      setNatOptions(natResponse.data);
      setVesselTypeOptions(vesselTypeResponse.data);
      setExpOptions(expResponse.data);
      setGradeOptions(gradeResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionsFromServer();
  }, []);

  return (
    <>
      <Container className="border rounded-3 p-4 mt-5  card shadow-sm w-100 ">
        <Form onSubmit={handleSubmit}>
          {" "}
          {/* Attach handleSubmit to form's onSubmit event */}
          <h5 className=" card-title mb-4 ">Add Candidate</h5>
          <Row>
          <Col>
            <FloatingLabel controlId="fname" label="First Name"className="mb-3">
            <Form.Control type="text" placeholder="Enter your first name" className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
            </FloatingLabel>
          </Col>
          <Col>
              <FloatingLabel controlId="lname" label="Last Name"className="mb-3">
              <Form.Control type="text" placeholder="Enter your Last name" className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="c_rank" label="Rank" className="mb-3">
              <Form.Select aria-label="Rank" className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
              <option>Select Rank</option>
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : (
                    rankOptions.ranks.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.rank}
                      </option>
                    ))
                  )}
              </Form.Select>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="avb_date" label="Availability" className="mb-3">
              <Form.Control type="date" placeholder="Select availability" className={`bg-transparent ${darkMode ? "dark-mode-text" : ""}`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="nationality" label="Nationality" className="mb-3">
              <Form.Select aria-label="Nationality" className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
                <option>Select Nationality</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  natOptions.countries.map((country, index) => (
                    <option key={index} value={country.id}>
                      {country.country}
                    </option>
                  ))
                )}
              </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="m_status" label="Marital Status" className="mb-3">
              <Form.Select aria-describedby="maritalStatusHelp" required className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
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
              <FloatingLabel controlId="dob" label="D.O.B" className="mb-3">
              <Form.Control type="text" placeholder="Enter your Birth date" className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="birth_place" label="Birth Place">
              <Form.Control type="text" placeholder="Enter your Birth Place" className={`bg-transparent ${darkMode ? "dark-mode-text" : ""}`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel  controlId="work_nautilus" label="Worked with us" className="mb-3">
              <Form.Select aria-describedby="workedWithUsHelp" required className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
                <option value="" disabled>
                  Select Option
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="c_vessel" label="Vessel Type" className="mb-3">
              <Form.Select aria-label="Vessel Type" className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
              <option>Select Vessel Type</option>
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                vesselTypeOptions.vsls.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.vesselType}
                  </option>
                ))
              )}
            </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="experience" label="Experience" className="mb-3">
              <Form.Select aria-label="Experience" className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
                <option>Select Experience</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  expOptions.experiences.map((experience, index) => (
                    <option key={experience.id} value={experience.id}>
                      {experience.experience}
                    </option>
                  ))
                )}
              </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="zone" label="Zone" className="mb-3">
              <Form.Select aria-describedby="zoneHelp"  required  className={`bg-transparent ${darkMode ? "text-white" : ""}`}  disabled={isLoading}>
                <option value="" disabled>
                  Select Option
                </option>
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
              <FloatingLabel controlId="grade" label="Grade" className="mb-3">
              <Form.Select aria-label="Grade" className={`bg-transparent ${darkMode ? "text-white" : ""}`} disabled={isLoading}>
                <option>Select Grade</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  gradeOptions.grades.map((grade, index) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.gradeExp}
                    </option>
                  ))
                )}
              </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="boiler_suit_size" label="Boiler Suit Size">
              <Form.Control type="text"  placeholder="Enter your Boiler suit size" className={`bg-transparent ${ darkMode ? "dark-mode-text" : ""  }`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="safety_shoe_size" label="Safety Shoe Size" className="mb-3">
              <Form.Control type="text" placeholder="Enter your Safety Shoe size" className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="height" label="Height">
              <Form.Control type="text" placeholder="Enter your height"  className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="weight" label="Weight" className="mb-3">
              <Form.Control type="text" placeholder="Enter your weight" className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="I_country" label="License Country" className="mb-3" >
              <Form.Select  aria-label="Nationality"  className={`bg-transparent ${darkMode ? "text-white" : ""}`}  disabled={isLoading}>
                <option>Select License </option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  natOptions.countries.map((country, index) => (
                    <option key={index} value={country.id}>
                      {country.country}
                    </option>
                  ))
                )}
              </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="indos_number" label="INDOS Number" className="mb-3" >
              <Form.Control  type="text"  placeholder="Enter your indos number"  className={`bg-transparent ${darkMode ? "text-white" : ""}`} style={{ border: "solid orange 2px" }}/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="company_status" label="Company Status" className="mb-3"  >
              <Form.Select aria-describedby="companyStatusHelp"  required  className={`bg-transparent ${darkMode ? "text-white" : ""}`}  disabled={isLoading}>
              <option value="" disabled>
                Select Option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="group" label="Group" className="mb-3">
              <Form.Select  aria-describedby="groupHelp"  required  className={`bg-transparent ${darkMode ? "text-white" : ""}`}  disabled={isLoading}>
                <option value="" disabled>
                  Select Option
                </option>
                <option value="Officer">Officer</option>
                <option value="Rating">Rating</option>
                <option value="IV crew">IV crew</option>
              </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="vendor" label="Vendor">
              <Form.Control type="text" placeholder="Enter Vendor"  className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="photos" label="Photo" className="mb-3">
              <Form.Control  type="file"  placeholder="Select Photo"  className={`bg-transparent ${darkMode ? "text-white" : ""}`}/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="resume" label="Resume">
                <Form.Control type="file" placeholder="Select Resume"  className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}/>
              </FloatingLabel>
            </Col>
          </Row>
          <h4>Primary Address</h4>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Floating>
              <Form.Control  className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="c_ad1"  placeholder="Address" required/>
              <Form.Label htmlFor="c_ad1">Address</Form.Label>
                            </Form.Floating>
                          </Col>
                          <Col md={3} className="mb-3">
                            <Form.Floating>
              <Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="c_city"  placeholder="City"  required/>
              <Form.Label htmlFor="c_city">City</Form.Label> </Form.Floating>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Floating>
              <Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="c_state" placeholder="State"  required/>
              <Form.Label htmlFor="candidate_c_state">State</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Floating>
<Form.Control className={`bg-transparent ${   darkMode ? "dark-mode-text" : "" }`} type="text" id="c_pin" placeholder="Pincode"  required/>
<Form.Label htmlFor="c_pin">Pincode</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Floating>
<Form.Control className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="candidate_c_mobi1"  placeholder="Mobile"  required/>
<Form.Label htmlFor="candidate_c_mobi1">Mobile</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Floating>
<Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : "" }`} type="text"  id="candidate_c_tel1"  placeholder="Landline"  required/>
<Form.Label htmlFor="candidate_c_tel1">Landline</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Floating>
<Form.Control
  className={`bg-transparent ${  darkMode ? "dark-mode-text" : ""}`} type="email"  id="candidate_email1"  placeholder="Email"  style={{ border: "solid orange 2px" }}  required/>
<Form.Label htmlFor="candidate_email1">Email</Form.Label>
              </Form.Floating>
            </Col>
          </Row>
          <h4>Alternate Address</h4>
          <Row>
            <Col md={6} className="mb-2">
              <Form.Floating>
<Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="candidate_c_ad2"  placeholder="Address"  required/>
<Form.Label htmlFor="candidate_c_ad2">Address</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={3} className="mb-2">
              <Form.Floating>
<Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="candidate_p_city"  placeholder="City"  required/>
<Form.Label htmlFor="candidate_p_city">City</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={3} className="mb-2">
              <Form.Floating>
<Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="candidate_p_state"  placeholder="State"  required/>
<Form.Label htmlFor="candidate_p_state">State</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Floating>
<Form.Control  className={`bg-transparent ${    darkMode ? "dark-mode-text" : ""  }`}  type="text"  id="candidate_p_pin" placeholder="Pincode" required/>
<Form.Label htmlFor="candidate_p_pin">Pincode</Form.Label>
              </Form.Floating>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Floating>
<Form.Control className={`bg-transparent ${   darkMode ? "dark-mode-text" : ""  }`}
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
  className={`bg-transparent ${
    darkMode ? "dark-mode-text" : ""
  }`}
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
  className={`bg-transparent ${
    darkMode ? "dark-mode-text" : ""
  }`}
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
              <Form.Control
type="hidden"
placeholder="Enter Nemo Source"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_active_details">
              <Form.Control
type="hidden"
placeholder="Enter active details"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_area_code1">
              <Form.Control
type="hidden"
placeholder="Enter area code1"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_area_code2">
              <Form.Control
type="hidden"
placeholder="Enter area code2"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_category">
              <Form.Control
type="hidden"
placeholder="Enter category"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_created_by">
              <Form.Control
type="hidden"
placeholder="Enter created by"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_created_date">
              <Form.Control
type="hidden"
placeholder="Enter created date"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_created_time">
              <Form.Control
type="hidden"
placeholder="Enter created time"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_editedby">
              <Form.Control
type="hidden"
placeholder="Enter edited by"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_imp_discussion">
              <Form.Control
type="hidden"
placeholder="Enter candidate imp discussion"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_ipadress">
              <Form.Control
type="hidden"
placeholder="Enter candidate ipaddress"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_joined_date">
              <Form.Control
type="hidden"
placeholder="Enter candidate joined date"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_last_company">
              <Form.Control
type="hidden"
placeholder="Enter candidate last company"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_last_salary">
              <Form.Control
type="hidden"
placeholder="Enter candidate last salary"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_last_date">
              <Form.Control
type="hidden"
placeholder="Enter candidate last date"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_last_time">
              <Form.Control
type="hidden"
placeholder="Enter candidate last time"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_mobile_code1">
              <Form.Control
type="hidden"
placeholder="Enter candidate mobile code 1"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_mobile_code2">
              <Form.Control
type="hidden"
placeholder="Enter candidate mobile code 2"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_mobile_status">
              <Form.Control
type="hidden"
placeholder="Enter candidate mobile status"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_other_mobile_code">
              <Form.Control
type="hidden"
placeholder="Enter candidate other mobile code"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_other_numbers">
              <Form.Control
type="hidden"
placeholder="Enter candidate other numbers"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_ad1">
              <Form.Control
type="hidden"
placeholder="Enter candidate p ad1"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_ad2">
              <Form.Control
type="hidden"
placeholder="Enter candidate p ad2"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_country">
              <Form.Control
type="hidden"
placeholder="Enter candidate p country"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_mobi1">
              <Form.Control
type="hidden"
placeholder="Enter candidate p mobi1"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_mobi2">
              <Form.Control
type="hidden"
placeholder="Enter candidate p mobi2"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_rank">
              <Form.Control
type="hidden"
placeholder="Enter candidate p rank"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_tel1">
              <Form.Control
type="hidden"
placeholder="Enter candidate p tel1"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_p_tel2">
              <Form.Control
type="hidden"
placeholder="Enter candidate p tel2"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_ref_check">
              <Form.Control
type="hidden"
placeholder="Enter candidate ref check"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_resume_upload_date">
              <Form.Control
type="hidden"
placeholder="Enter candidate resume upload date"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_skype">
              <Form.Control
type="hidden"
placeholder="Enter candidate skype"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_stcw">
              <Form.Control
type="hidden"
placeholder="Enter candidate stcw"
required
              />
            </Form.Group>
            <Form.Group controlId="candidate_vendor_id">
              <Form.Control
type="hidden"
placeholder="Enter candidate vendor id"
required
              />
            </Form.Group>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary  mt-3 shadow-lg rounded-2"
            >
              {" "}
              <CgCheck /> Add Candidate
            </button>{" "}
            {/* Submit button */}
            <Link to={"/candidate-view"} className="btn btn-danger mt-3 ">
              <IoIosClose /> Cancel
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Candidate_add;
