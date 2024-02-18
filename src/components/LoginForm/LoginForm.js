import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        userName: username,
        userPassword: password,
      });

      // Handle successful login
      console.log('Login successful:', response.data);
      const {token,userId} = response.data
      console.log(token,userId)
      localStorage.setItem('token',token)
      localStorage.setItem('userId',userId)
      // Redirect to indexpage or user-managment
      window.location.href = '/user-dashboard'; // Redirect to user dashboard after successful login
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login error
      console.error('Login failed:', error.response.data.message);
      // Display an error message to the user
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <span className="fw-bold h2 text-primary  " >Nsnemo</span>
        </div>
        <h2 className="text-center mb-4 fw-bolder">Sign in to Continue</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="user_id">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter your username"
              autoFocus
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="user_pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="passwords"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Link to="/user-forgot-pass" className="d-block mt-2 text-end">Forgot Password?</Link>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Sign in</Button>
        </Form>
        <ul className="mt-3 ">
          <li>
            <Link to="/candidate-login" className="text-decoration-none">Redirect - Candidate Login</Link>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Login;
