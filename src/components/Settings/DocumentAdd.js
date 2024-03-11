import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';

function DocumentAdd() {
  const [documentType, setdocumentType] = useState('');
  const [hideExpiryDate, setHideExpiryDate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/others/create-document',
        { documentType, hideExpiryDate },
        { headers: { Authorization: token } }
      );

      console.log('Document creation response:', response.data);
      // Optionally, you can handle success or navigate to another page here
    } catch (error) {
      console.error('Error creating document:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <Form className="p-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">Document - Add</h4>
      <Form.Group className="mb-3" controlId="documentType">
        <Form.Label>Document Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter document name"
          value={documentType}
          onChange={(e) => setdocumentType(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="hideExpiry">
        <Form.Check
          type="checkbox"
          label="Hide Expiry?"
          checked={hideExpiryDate}
          onChange={(e) => setHideExpiryDate(e.target.checked)}
        />
      </Form.Group>
      <div className="text-end">
          <Button type="submit" variant="primary"> <CgCheck/> Add Document</Button>
          <Link to={`/doc-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

        </div>
    </Form>
  );
}

export default DocumentAdd;
