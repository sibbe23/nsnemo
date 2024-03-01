import React from 'react';

function Reports() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Reports</h2>
      <p>This page is under construction.</p>
      <div style={loadingStyle}></div>
      <p>Loading...</p>
    </div>
  );
}

const loadingStyle = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  animation: 'spin 1.5s linear infinite',
  margin: '20px auto',
};

export default Reports;
