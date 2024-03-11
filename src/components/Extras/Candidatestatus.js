import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Candidatestatus() {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch candidate data from the server
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/candidate/view-candidate`, { headers: { "Authorization": token } });
        const candidateData = response.data;

        // Filter candidates based on company_status and count active and inactive candidates
        const activeCandidates = candidateData.candidates.filter(candidate => candidate.company_status === 'active');
        const inactiveCandidates = candidateData.candidates.filter(candidate => candidate.company_status !== 'active');

        setActiveCount(activeCandidates.length);
        setInactiveCount(inactiveCandidates.length);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [token]);

  return (
    <div className="container mt-5  ">
      <div className="row justify-content-center">
        <div className="col-md-4">
        <h4 className="text-center mb-0  ">Candidate Status</h4>

          <table className="table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className='text-success fw-bolder'>Active</th>
                <th scope="col" className='text-danger fw-bolder'>Inactive</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className=" rounded-pill bg-success text-white p-1 ps-3 pe-3">{activeCount}</span></td>
                <td><span className="rounded-pill bg-danger text-white p-1 ps-3 pe-3">{inactiveCount}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Candidatestatus;
