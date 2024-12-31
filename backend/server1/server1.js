require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//const serverless = require('serverless-http');

const app1 = express();


const corsOptions = {
  origin: [`${process.env.FRONTEND_URL}/signup`,'http://localhost:3000'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true, // Enable cookies and credentials
};

// Middleware
app1.use(bodyParser.json());
app1.use(cors(corsOptions));

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

connectDB();

// User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Helper function: Validate user input
const validateUserInput = (username, password) => {
  if (!username || !password) {
    return 'Username and password are required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

app1.get('/response',(req,res)=>{
  res.send("checking !!");
})

// Endpoint to handle user signup
app1.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const validationError = validateUserInput(username, password);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to handle user login
app1.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const validationError = validateUserInput(username, password);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Conditional: Development vs Production
 if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT1 || 5006;
  app1.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT} | `);
  });
} else {
  // Export the app1 for serverless deployment (e.g., Vercel)
  //module.exports = serverless(app1);
  module.exports = app1;
}
