import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/complaints-bg.jpg';

const AddComplaint = ({ handleLogout }) => {
  const [complaint, setComplaint] = useState({
    residentName: '',
    description: '',
    status: 'Pending',
  });
  const [residents, setResidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/residents`);
        setResidents(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResidents();
  }, []);

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/complaints`, complaint);
      navigate('/complaints');
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
        <h2>Add Complaint</h2>
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
          <Link to="/complaints" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Complaints
          </Link>
          <Link to="/" onClick={handleLogout} style={{ margin: '0 10px', color: '#dc3545', textDecoration: 'none' }}>
            Logout
          </Link>
        </nav>
        <form onSubmit={handleSubmit}>
          <select name="residentName" value={complaint.residentName} onChange={handleChange} required>
            <option value="">Select Resident</option>
            {residents.map((resident) => (
              <option key={resident._id} value={resident.name}>
                {resident.name}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Complaint Description"
            value={complaint.description}
            onChange={handleChange}
            required
          />
          <select name="status" value={complaint.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button type="submit" className="submit-btn">
            Add Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;