import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CgCheck } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";


function DocumentEdit() {
  const { docId } = useParams();
  const [documentType, setDocumentType] = useState('');
  const [hideExpiryDate, setHideExpiryDate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/others/get-document/${docId}`);
      const fetchedDocument = response.data.document;

      setDocumentType(fetchedDocument.documentType);
      setHideExpiryDate(fetchedDocument.hideExpiryDate);
    } catch (error) {
      console.error('Error fetching document:', error);
      setErrorMessage('Failed to fetch document');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/others/update-document/${docId}`, {
        documentType,
        hideExpiryDate
      }, {
        headers: { Authorization: token }
      });

      console.log('Response:', response.data);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error('Error updating document:', error);
      setErrorMessage('Failed to update document');
    }
  };

  return (
    <div className="p-5">
      <h4 className="mb-3">Edit Document</h4>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="documentType">
          <Form.Label>Document Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter document type"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="hideExpiryDate">
          <Form.Check
            type="checkbox"
            label="Hide Expiry?"
            checked={hideExpiryDate}
            onChange={(e) => setHideExpiryDate(e.target.checked)}
          />
        </Form.Group>
        <div className="text-end">
          <Button type="submit" variant="primary"> <CgCheck/> Save Changes</Button>
          <Link to={`/doc-view`} className='btn btn-danger ms-2'> <IoIosClose/> Cancel</Link>

        </div>
      </Form>
    </div>
  );
}

export default DocumentEdit;
