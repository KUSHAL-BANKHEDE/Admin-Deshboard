const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const categoryRoutes = require('./routes/categoryRouter');
const aboutusRoutes = require('./routes/aboutusRoutes');
const footerRoutes = require('./routes/footerRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Import book routes

const app = express();
const PORT = 5003;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
  
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
  
// Define routes
app.use('/api', authRoutes);
app.use('/api', servicesRoutes);
app.use('/api', categoryRoutes);
app.use('/api', aboutusRoutes);
app.use('/api', footerRoutes);
app.use('/api/books', bookRoutes); // Use the book routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Admin ID: "admin" and Admin Password: "admin" created');
});
