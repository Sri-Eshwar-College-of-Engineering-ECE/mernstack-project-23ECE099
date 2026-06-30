import { Link } from 'react-router-dom';
import backgroundImage from '../assets/home-bg.jpg';

const Home = () => {
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
        <h1>Welcome to Hostel Management System</h1>
        <p>Manage your hostel operations efficiently.</p>
        <nav>
          <Link to="/login" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>
            Login
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
        </nav>
      </div>
    </div>
  );
};

export default Home;