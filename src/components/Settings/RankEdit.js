import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function RankEdit() {
  const { rankId } = useParams();
  const [rank, setRank] = useState('');
  const [rankOrder, setRankOrder] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRank();
  }, []);

  const fetchRank = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3000/others/get-ranks/${rankId}`);

      const fetchedRank = response.data.rank;
      console.log(response,fetchedRank)

      setRank(fetchedRank.rank);
      setRankOrder(fetchedRank.rankOrder);
      setCategory(fetchedRank.category);
    } catch (error) {
      console.error('Error fetching rank:', error);
      setErrorMessage('Failed to fetch rank');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/others/update-rank/${rankId}`, { rank, rankOrder, category }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error updating rank:', error);
      setErrorMessage('Failed to update rank');
    }
  };

  return (
    <Form id="rank-form" className="card-body pb-0 p-5" onSubmit={handleSubmit}>
      <h4>Rank - Edit</h4>
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
        <Button type="submit" className="btn btn-primary"> <CgCheck/> Save Changes</Button>
        <Link to={`/rank-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

      </div>
    </Form>
  );
}

export default RankEdit;
