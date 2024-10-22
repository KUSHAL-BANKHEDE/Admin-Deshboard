const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const { getAllAboutus, createAboutus, updateAboutus, deleteAboutus } = require('../controllers/aboutusController');

const router = express.Router();

router.get('/aboutus', getAllAboutus);
router.post('/aboutus', authMiddleware,  createAboutus);
router.put('/aboutus/:id', authMiddleware,  updateAboutus);
router.delete('/aboutus/:id', authMiddleware, deleteAboutus);

module.exports = router;