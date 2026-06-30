import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRoom = () => {
  const [room, setRoom] = useState({
    roomNumber: '',
    type: 'Single',
    status: 'Vacant',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rooms', room, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Room creation failed:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Room</h2>
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
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
