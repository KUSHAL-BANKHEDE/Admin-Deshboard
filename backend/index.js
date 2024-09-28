const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');

const app = express();
app.use(cors());
const PORT = 5003;

// Middleware to parse incoming request body
app.use(bodyParser.json());

// Hardcoded admin credentials
 // This should be a strong secret key in production

 app.use('/api', authRoutes);
 app.use('/api' , servicesRoutes);
 

// Example protected route
// app.get('/admin-dashboard', verifyToken, (req, res) => {
//     res.json({ message: 'Welcome to the Admin Dashboard', user: req.user });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Admin ID: "admin" and Admin Password: "admin" created');
});
