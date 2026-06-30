import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import RoomList from './components/RoomList';
import AddRoom from './components/AddRoom';
import UpdateRoom from './components/UpdateRoom';
import ResidentList from './components/ResidentList';
import AddResident from './components/AddResident';
import AttendanceList from './components/AttendanceList';
import AddAttendance from './components/AddAttendance';
import ComplaintList from './components/ComplaintList';
import AddComplaint from './components/AddComplaint';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated && location.pathname !== '/' && location.pathname !== '/login') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <RoomList handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-room"
          element={
            <ProtectedRoute>
              <AddRoom handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-room/:id"
          element={
            <ProtectedRoute>
              <UpdateRoom handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/residents"
          element={
            <ProtectedRoute>
              <ResidentList handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-resident"
          element={
            <ProtectedRoute>
              <AddResident handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendanceList handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-attendance"
          element={
            <ProtectedRoute>
              <AddAttendance handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintList handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-complaint"
          element={
            <ProtectedRoute>
              <AddComplaint handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;