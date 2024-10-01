const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];;
    const secretKey = 'yourSecretKey';
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        console.log("middileware is working fine");
        next();
    });
};

module.exports = authMiddleware;

