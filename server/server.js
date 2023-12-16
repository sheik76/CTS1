const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Import the crypto module
const User = require('./Signupschema');

const app = express();
const port = 3002;

const username = encodeURIComponent("sheikaalam");
const password = encodeURIComponent("sheikaalam@87619");

// Connect to MongoDB Atlas (replace YOUR_CONNECTION_STRING with your actual connection string)
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ucjuwvu.mongodb.net/`);

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Generate a secure secret key using the crypto module
const JWT_SECRET = crypto.randomBytes(32).toString('hex');

// Function to generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Endpoint for user registration (moved within the same scope)
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, userType } = req.body;

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      userType,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token for the new user
    const token = generateToken({ userId: newUser._id, userType: newUser.userType });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for user login with JWT token
app.post('/login', async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ firstName, lastName, password });

    if (user) {
      // User exists, generate a token
      const token = generateToken({ userId: user._id, userType: user.userType });
       console.log(token)
      // Send the token in the response
      res.status(200).json({ message: 'Login successful', user, token });
    } else {
      // User not found, send an error response
      res.status(404).json({ message: 'User not found or incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get customer details using JWT token
app.get('/customers', async (req, res) => {
  try {
    // Extract user type from the token in the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const decoded = jwt.verify(token,JWT_SECRET );
    console.log(decoded)
   
    if (decoded && decoded.userType === 'admin') {
      // Find all users with userType 'customer'
      const customers = await User.find({ userType: 'customer' });

      // Send the list of customers in the response
      res.status(200).json(customers);
    } else {
      // Unauthorized access
      res.status(403).json({ message: 'Unauthorized access' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get user information using JWT token
app.get('/userinfo', async (req, res) => {
  try {
    // Extract user type from the token in the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    console.log(token)
    const decoded = jwt.verify(token,JWT_SECRET );
    console.log(decoded)
    if (decoded) {
      
      // Find the user in the database based on the userId
      const user = await User.findById(decoded.userId);

      if (user) {
        // User found, send the user details in the response
        res.status(200).json({ user });
      } else {
        // User not found, send an error response
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      // Unauthorized access
      res.status(403).json({ message: 'Unauthorized access' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log("Connection successful");
  console.log(`Server is running on port ${port}`);
  console.log(`JWT Secret Key: ${JWT_SECRET}`);
});
