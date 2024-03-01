import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Country() {
  useEffect(() => {
    displayCountryCodes();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  async function displayCountryCodes() {
    try {
      const token = localStorage.getItem('token') // Make sure to replace 'your_token_here' with your actual token
      const response = await axios.get('http://localhost:3000/others/country-codes', { headers: { "Authorization": token } });
      const data = response.data;

      if (data.countryCodes && data.countryCodes.length > 0) {
        let sno = 1;

        data.countryCodes.forEach(country => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${sno}</td>
                    <td>${country.country_code}</td>
                    <td>${country.country}</td>
                    <td>${country.phone_code}</td>
                    
                `;
          document.getElementById("country-code-table").appendChild(row);
          sno++;
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='me-3 ms-3'  >

    <div className="table-responsive" style={{height:'100vh'}}>
    <h4 className="text-center mt-3 mb-0 rounded-0 shadow-none  text-bg-primary card p-4 mt-5 mb-0">Country Codes</h4>

      <Table id="country-code-list" className="table table-sm table-striped table-bordered text-center">
        <thead>
          <tr>
            <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Sno</th>
            <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Country Code</th>
            <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Country</th>
            <th scope="col" style={{backgroundColor:'orange', border:'orange solid 2px'}} className='p-1 text-white '>Phone Code</th>
          </tr>
        </thead>
        <tbody id="country-code-table"></tbody>
      </Table>
    </div>
    </div>
  );
}

export default Country;
