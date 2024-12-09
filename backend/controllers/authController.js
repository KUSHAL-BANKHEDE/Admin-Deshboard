const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminID = 'admin';
const adminPassword = 'admin';
const secretKey = 'kushal';


// User login
exports.login =  (req, res) => {
    const { email, password } = req.body;

    // Check if the provided username and password match the admin credentials
    if (email === adminID && password === adminPassword) {
        // Generate a JWT token
        const token = jwt.sign({ email }, secretKey, { expiresIn: '10h' });
        return res.status(200).json({ message: 'Login successful', token });
       
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
