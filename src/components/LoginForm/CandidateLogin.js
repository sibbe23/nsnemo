import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaShip } from "react-icons/fa";
import {  Button } from 'react-bootstrap'; // Import Container and Button
import '../../App.css'

const CandidateLogin = () => {
  const [formData, setFormData] = useState({
    indosNumber: '',
    email: '',
    password: ''
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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
      window.location.href = '/candidate-dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-form' style={{height:'100vh'}}>
      <h1 className=''>Nsnemo</h1>
      <div className='container' style={{maxWidth:'800px', margin:'0 auto'}}>
        <div className='main'>
          <div className='content'>
            <h2>Candidate</h2>
            <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="indosNumber"
          value={formData.indosNumber}
          onChange={handleChange}
          placeholder="INDOS Number"
          required
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Button className='button' type="submit" style={{ backgroundColor: isHovered ? '#FF520E' : '#045EDD' }} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
                Login
              </Button>
      </form>
      <div className='text-center'>
      <Link to="/candidate-forgot-pass" className="text-decoration-none text-secondary btn">Forgot Password?</Link> </div>
          </div>
          <div className='form-img'>
            <img src='nemo.png' alt='Nsnemo' />
          </div>
        </div>
      </div>
      <Link to="/login" className="text-decoration-none text-center">
        <FaShip className=" me-3" />
        Redirect - User Login
      </Link>
    </div>
  );
};

export default CandidateLogin;
