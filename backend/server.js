const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const todoRoutes = require('./src/routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, 
  message: "Terlalu banyak permintaan dari IP ini, coba lagi setelah 15 menit!"
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10kb' }));
app.use('/api/', apiLimiter);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes); 

// Basic route (for testing)
app.get('/', (req, res) => {
  res.send('To-Do List API is running!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access To-Do API at: http://localhost:${PORT}/api/todos`);
});