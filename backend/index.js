const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const categoryRoutes = require('./routes/categoryRouter');
const aboutusRoutes = require('./routes/aboutusRoutes');
const footerRoutes = require('./routes/footerRoutes');
const path = require('path');
dotenv.config(); 

const app = express();
app.use(cors());
const PORT = 5003;

// Middleware to parse incoming request body
app.use(bodyParser.json());

// Hardcoded admin credentials
 // This should be a strong secret key in production
 
 mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch((err) => console.error(err));


 app.use('/api', authRoutes);
 app.use('/api' , servicesRoutes);
 app.use('/api' , categoryRoutes);
 app.use('/api' , aboutusRoutes);
 app.use('/api' , footerRoutes);
 

// Example protected route
// app.get('/admin-dashboard', verifyToken, (req, res) => {
//     res.json({ message: 'Welcome to the Admin Dashboard', user: req.user });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Admin ID: "admin" and Admin Password: "admin" created');
});
