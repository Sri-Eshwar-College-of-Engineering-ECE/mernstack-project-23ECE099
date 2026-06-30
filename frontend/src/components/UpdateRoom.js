import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/update-room-bg.jpg';

const UpdateRoom = ({ handleLogout }) => {
  const { id } = useParams();
  const [room, setRoom] = useState({
    roomNumber: '',
    type: '',
    status: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/rooms/${id}`, room);
      navigate('/rooms');
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
        <h2>Update Room</h2>
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
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={room.roomNumber}
            onChange={handleChange}
            required
          />
          <select name="type" value={room.type} onChange={handleChange}>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
          <select name="status" value={room.status} onChange={handleChange}>
            <option value="Vacant">Vacant</option>
            <option value="Occupied">Occupied</option>
          </select>
          <button type="submit" className="submit-btn">
            Update Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;