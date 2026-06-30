const express = require('express');
const router = express.Router();

// Hardcoded admin user (for simplicity; replace with DB later)
const ADMIN_USER = {
  username: 'admin',
  password: 'password123',
};

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    // Successful login
    res.status(200).json({ message: 'Login successful', user: { username } });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;