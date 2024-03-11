import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { CgCheck } from 'react-icons/cg';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Reports() {
  const token = localStorage.getItem('token');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFields, setSelectedFields] = useState({
    candidateId: false,
    fname: false,
    c_rank: false,
    c_vessel: false,
    c_ad1: false,
    c_city: false,
    nationality: false,
    c_mobi1: false,
    last_company: false,
    email1: false,
    last_salary: false,
    experience: false,
    dob: false,
    avb_date: false,
    height: false,
    weight: false,
    safety_shoe_size: false,
    boiler_suit_size: false
  });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [group, setGroup] = useState('all');
  const [userList, setUserList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleGenerateReport = async () => {
    try {
      if (!fromDate || !toDate ) {
        setError('Please fill in all required fields.');
        return;
      }

      setError('');

      let endpoint = '';
      if (selectedOption === 'New Profile') {
        endpoint = 'http://localhost:3000/candidate/reports/view-new-profile';
      } else {
        // Add other endpoints for different report types
      }

      const response = await axios.post(endpoint, { selectedFields, group }, { headers: { "Authorization": token } });
      console.log(response)
      setReportData(response.data.candidates);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleExportToExcel = () => {
    const selectedColumns = Object.entries(selectedFields)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    const filteredData = reportData.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    XLSX.writeFile(wb, "report.xlsx");
  };

  const renderTable = () => {
    const selectedColumns = Object.entries(selectedFields)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (selectedColumns.length === 0 || reportData.length === 0) {
      return <div>No data to display</div>;
    }

    const checkboxLabels = {
      candidateId: "Candidate ID",
      fname: "First Name",
      c_rank: "Rank",
      c_vessel: "Vessel Type",
      c_ad1: "Address",
      c_city: "City",
      nationality: "Nationality",
      c_mobi1: "Contact Number",
      last_company: "Previous Company",
      email1: "Email",
      last_salary: "Last Salary",
      experience: "Experience",
      dob: "Date of Birth",
      avb_date: "Availability",
      height: "Height",
      weight: "Weight",
      safety_shoe_size: "Safety Shoe Size",
      boiler_suit_size: "Boiler Suit Size"
    };

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {selectedColumns.map((columnKey, index) => (
                <th key={index}>{checkboxLabels[columnKey]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {selectedColumns.map((columnKey, columnIndex) => (
                  <td key={columnIndex}>{rowData[columnKey]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='text-end mt-3'>
          <Button variant="success" type="button" onClick={handleExportToExcel}>
            Export to Excel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Container className='p-5'>
      <h1>Reports</h1>
      <Form>
        <Form.Group controlId="reportType">
          <Form.Label>Select Report</Form.Label>
          <Form.Control as="select" value={selectedOption} onChange={handleDropdownChange} className='mb-3'>
            <option value="">Select Report</option>
            <option value="New Profile">New Profile</option>
            {/* Add more options here */}
          </Form.Control>
        </Form.Group>

        {selectedOption === 'New Profile' && (
          <NewProfileFields
            selectedFields={selectedFields}
            handleCheckboxChange={handleCheckboxChange}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            group={group}
            setGroup={setGroup}
            userList={userList}
            setUserList={setUserList}
          />
        )}

        <div className='text-end mt-3 mb-3'>
          <Button variant="primary" type="button" onClick={handleGenerateReport}>
            <CgCheck/> Generate Report
          </Button>
        </div>

        {error && <div className="text-danger">{error}</div>}

      </Form>

      {/* Render the table */}
      {renderTable()}
    </Container>
  );
}

function NewProfileFields({ selectedFields, handleCheckboxChange, fromDate, setFromDate, toDate, setToDate, group, setGroup, userList, setUserList }) {
  const checkboxLabels = {
    candidateId: "Candidate ID",
    fname: "First Name",
    c_rank: "Rank",
    c_vessel: "Vessel Type",
    c_ad1: "Address",
    c_city: "City",
    nationality: "Nationality",
    c_mobi1: "Contact Number",
    last_company: "Previous Company",
    email1: "Email",
    last_salary: "Last Salary",
    experience: "Experience",
    dob: "Date of Birth",
    avb_date: "Availability",
    height: "Height",
    weight: "Weight",
    safety_shoe_size: "Safety Shoe Size",
    boiler_suit_size: "Boiler Suit Size"
  };

  return (
    <div className='border rounded-2 border-secondary p-3'>
      <h2 className="mb-3">New Profile</h2>
      <Row>
        <Col xs={6} md={3}>
          <Form.Group controlId="fromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="toDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="group">
            <Form.Label>Group</Form.Label>
            <Form.Select value={group} onChange={(e) => setGroup(e.target.value)} required>
              <option value="all">All</option>
              <option value="Officer">Officer</option>
              <option value="Rating">Rating</option>
              <option value="IV crew">IV crew</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="userList">
            <Form.Label>User List</Form.Label>
            <Form.Select value={userList} onChange={(e) => setUserList(e.target.value)} required>
              <option value="all">All</option>
              {/* Map user list options here */}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Select Fields:</Form.Label>
            <div className="d-flex flex-wrap border border-secondary rounded-3 p-3">
              {Object.entries(selectedFields).map(([key, value]) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  id={key}
                  name={key}
                  label={checkboxLabels[key]} // Use the display name from checkboxLabels
                  checked={value}
                  onChange={handleCheckboxChange}
                  className="m-3"
                  style={{ fontSize: '1.2rem' }}
                />
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;
