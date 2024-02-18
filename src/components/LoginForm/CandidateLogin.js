import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CandidateLogin = () => {
  const [formData, setFormData] = useState({
    indosNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/candidate/login', formData);
      console.log(response.data);
      const { token, candidateId } = response.data;
      localStorage.setItem('ctoken', token);
      localStorage.setItem('cmemId', candidateId);
      
      // Redirect to candidate dashboard using Link
      // This will work only if the route is defined in your Router configuration
      // For example, if you are using React Router, you should have a route defined for '/candidate-dashboard'
      window.location.href = '/candidate-dashboard';
    } catch (error) {
      console.error(error);
      // Handle error (if needed)
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          {/* Your Logo Here */}
          <span className="fw-bold h2 text-primary ">Nsnemo</span>
        </div>
        <h2 className="text-center mb-4 fw-bolder">Sign in to Continue</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="indos_number">
            <Form.Label>INDOS Number</Form.Label>
            <Form.Control
              type="text"
              name="indosNumber"
              value={formData.indosNumber}
              onChange={handleChange}
              placeholder="Enter your INDOS Number"
              autoComplete="indos-number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="user_id">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="user_pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
            />
            <Link to="/user-forgot-pass" className="d-block mt-2 text-end">Forgot Password?</Link>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Sign in</Button>
        </Form>
        <ul className="mt-3 ">
          <li>
            <Link to="/login" className="text-decoration-none">Redirect - User Login</Link>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default CandidateLogin;
