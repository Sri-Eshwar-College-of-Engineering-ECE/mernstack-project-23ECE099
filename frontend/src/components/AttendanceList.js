import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/attendance-bg.jpg';

const AttendanceList = ({ handleLogout }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/attendance`);
        setAttendanceRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance records. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1>Attendance Records</h1>
        <nav>
          <Link to="/" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/rooms" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Rooms
          </Link>
          <Link to="/residents" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Residents
          </Link>
          <Link to="/add-attendance" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Add Attendance
          </Link>
          <Link to="/complaints" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Complaints
          </Link>
          <Link to="/" onClick={handleLogout} style={{ margin: '0 10px', color: '#dc3545', textDecoration: 'none' }}>
            Logout
          </Link>
        </nav>
        {loading ? (
          <p>Loading attendance records...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Resident Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="3">No attendance records found.</td>
                </tr>
              ) : (
                attendanceRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.residentName}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;