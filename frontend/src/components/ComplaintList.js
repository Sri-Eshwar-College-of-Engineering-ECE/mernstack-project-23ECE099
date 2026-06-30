import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/complaints-bg.jpg';

const ComplaintList = ({ handleLogout }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/complaints`);
        setComplaints(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
      await axios.put(`${API_URL}/api/complaints/${id}`, { status: newStatus });
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

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
        <h1>Complaints</h1>
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
          <Link to="/attendance" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Attendance
          </Link>
          <Link to="/add-complaint" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Add Complaint
          </Link>
          <Link to="/" onClick={handleLogout} style={{ margin: '0 10px', color: '#dc3545', textDecoration: 'none' }}>
            Logout
          </Link>
        </nav>
        <table>
          <thead>
            <tr>
              <th>Resident Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.residentName}</td>
                <td>{complaint.description}</td>
                <td>{complaint.status}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => updateStatus(complaint._id, complaint.status)}
                  >
                    {complaint.status === 'Pending' ? 'Mark Resolved' : 'Mark Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintList;