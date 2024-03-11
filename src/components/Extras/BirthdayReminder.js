import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BirthdayReminder = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch data for today's date when the component mounts
        fetchTodaysData();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const fetchTodaysData = async () => {
        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            const response = await axios.post('http://localhost:3000/candidate/birthday', { date: today }, {
                headers: { "Authorization": token }
            });
            setCandidates(response.data.candidates);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = () => {
        // Fetch data based on selected date when submit button is clicked
        fetchData(selectedDate);
    };

    const fetchData = async (date) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/candidate/birthday', { date }, {
                headers: { "Authorization": token }
            });
            setCandidates(response.data.candidates);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='p-5'>
            <h1>Birthday Reminder</h1>
            <div className='d-flex justify-content-center mb-4'>
                <div className='bg-white text-center p-5 card' style={{ width: '250px' }}>
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        className='btn btn-secondary mt-3 mb-3'
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div className='table-responsive card p-5 '>
                    <span className='text-center text-white p-3 fw-bolder ' style={{backgroundColor:"#252F81"}}>BIRTHDAYS</span>
                    <table className='table table-sm table-bordered  table-striped '>
                        <thead>
                            <tr className='text-center'>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Nemo Id</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white '>First Name</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Last Name</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Rank</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Mobile</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Email</th>
                                <th style={{ backgroundColor: 'orange' }} className='p-1 text-white  ' >Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.candidateId}</td>
                                    <td>{candidate.fname}</td>
                                    <td>{candidate.lname}</td>                                    <td>{candidate.lname}</td>
                                    <td className='text-center'>{candidate.c_mobi1}</td>
                                    <td>{candidate.email1}</td>
                                    <td className='text-center'>{new Date(candidate.dob).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BirthdayReminder;
