import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/residents-bg.jpg';

const AddResident = ({ handleLogout }) => {
  const [resident, setResident] = useState({
    name: '',
    roomNumber: '',
    inOutStatus: 'In',
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/rooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch rooms. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setResident({ ...resident, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/residents`, resident);
      navigate('/residents');
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
        <h2>Add Resident</h2>
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
        {loading ? (
          <p>Loading rooms...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Resident Name"
              value={resident.name}
              onChange={handleChange}
              required
            />
            <select name="roomNumber" value={resident.roomNumber} onChange={handleChange} required>
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room.roomNumber}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
            <select name="inOutStatus" value={resident.inOutStatus} onChange={handleChange}>
              <option value="In">In</option>
              <option value="Out">Out</option>
            </select>
            <button type="submit" className="submit-btn">
              Add Resident
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddResident;