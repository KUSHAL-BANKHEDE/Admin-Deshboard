const express = require('express');
const { login,} = require('../controllers/authController');
const router = express.Router();


router.post('/login', login);
// router.get('/google', googleLogin);

module.exports = router;
