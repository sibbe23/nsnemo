import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function RankAdd() {
  const [rank, setRank] = useState('');
  const [rankOrder, setRankOrder] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/others/create-rank', { rank, rankOrder, category }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error creating rank:', error);
      setErrorMessage('Failed to create rank');
    }
  };

  return (
    <Form id="rank-form" className="card-body pb-0 p-5" onSubmit={handleSubmit}>
      <h4>Rank - Add</h4>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="rank" className=" col-form-label">Rank:</Form.Label>
        <Col >
          <Form.Control 
            type="text" 
            id="rank" 
            placeholder="Enter rank" 
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required 
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="rank_order" className=" col-form-label">Rank Order:</Form.Label>
        <Col >
          <Form.Control 
            type="text" 
            id="rank_order" 
            placeholder="Enter rank order" 
            value={rankOrder}
            onChange={(e) => setRankOrder(e.target.value)}
            required 
          />
        </Col>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label htmlFor="category" className=" col-form-label">Category:</Form.Label>
        <Col>
          <Form.Control 
            type="text" 
            id="category" 
            placeholder="Enter category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required 
          />
        </Col>
      </Form.Group>
      <div className="text-end mb-3">
        <Button type="submit" className="btn btn-primary"> <CgCheck/> Add Rank</Button>
        <Link to={`/rank-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

      </div>
    </Form>
  );
}

export default RankAdd;
