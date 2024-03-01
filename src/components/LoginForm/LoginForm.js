import React, { useState } from 'react';
import '../StyledComponents/index';
import axios from 'axios';
import { FaShip } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {  Button } from 'react-bootstrap'; // Import Container and Button
import '../../App.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        userName: username,
        userPassword: password,
      });

      console.log('Login successful:', response.data);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error during login:', error.message);
      console.error('Login failed:', error.response.data.message);
      // Handle error or display error message to the user
    }
  };

  return (
    <div className='login-form'>
      <h1 className=''>Nsnemo</h1>
      <div className='container' style={{maxWidth:'800px', margin:'0 auto'}}>
        <div className='main'>
          <div className='content'>
            <h2>User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <Button className='button' type="submit" style={{ backgroundColor: isHovered ? '#FF520E' : '#045EDD' }} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
                Login
              </Button>
            </form>
            <div className='text-center'>

            <Link to="/user-forgot-pass" className="text-decoration-none text-secondary btn ">Forgot Password?</Link>
            </div>
          </div>
          <div className='form-img'>
            <img src='nemo.png' alt='Nsnemo' />
          </div>
        </div>
      </div>
      <Link to="/candidate-login" className="text-decoration-none text-center">
        <FaShip className=" me-3" />
        Redirect - Candidate Login
      </Link>
    </div>
  );
};

export default Login;
