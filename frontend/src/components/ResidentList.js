import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/residents-bg.jpg';

const ResidentList = ({ handleLogout }) => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/residents`);
        setResidents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch residents. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchResidents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/residents/${id}`);
      setResidents(residents.filter((resident) => resident._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleInOutStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'In' ? 'Out' : 'In';
      await axios.put(`${API_URL}/api/residents/${id}`, { inOutStatus: newStatus });
      setResidents(
        residents.map((resident) =>
          resident._id === id ? { ...resident, inOutStatus: newStatus } : resident
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
        <h1>Residents</h1>
        <nav>
          <Link to="/" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/rooms" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Rooms
          </Link>
          <Link to="/add-resident" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Add Resident
          </Link>
          <Link to="/attendance" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Attendance
          </Link>
          <Link to="/complaints" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Complaints
          </Link>
          <Link to="/" onClick={handleLogout} style={{ margin: '0 10px', color: '#dc3545', textDecoration: 'none' }}>
            Logout
          </Link>
        </nav>
        {loading ? (
          <p>Loading residents...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room Number</th>
                <th>In/Out Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {residents.length === 0 ? (
                <tr>
                  <td colSpan="4">No residents found.</td>
                </tr>
              ) : (
                residents.map((resident) => (
                  <tr key={resident._id}>
                    <td>{resident.name}</td>
                    <td>{resident.roomNumber}</td>
                    <td>{resident.inOutStatus}</td>
                    <td>
                      <button
                        className="update-btn"
                        onClick={() => toggleInOutStatus(resident._id, resident.inOutStatus)}
                      >
                        Toggle In/Out
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(resident._id)}>
                        Delete
                      </button>
                    </td>
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

export default ResidentList;