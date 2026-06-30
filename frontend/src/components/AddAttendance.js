import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/attendance-bg.jpg';

const AddAttendance = ({ handleLogout }) => {
  const [attendance, setAttendance] = useState({
    residentName: '',
    date: '',
    status: 'Present',
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
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/attendance`, attendance);
      navigate('/attendance');
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
        <h2>Add Attendance</h2>
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
          <select name="residentName" value={attendance.residentName} onChange={handleChange} required>
            <option value="">Select Resident</option>
            {residents.map((resident) => (
              <option key={resident._id} value={resident.name}>
                {resident.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
            required
          />
          <select name="status" value={attendance.status} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button type="submit" className="submit-btn">
            Add Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAttendance;