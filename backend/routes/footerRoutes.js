const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { getAllFooter, createFooter, updateFooter, deleteFooter } = require('../controllers/footerController');

const router = express.Router();

router.get('/footer', getAllFooter);
router.post('/footer', authMiddleware,  createFooter);
router.put('/footer/:id', authMiddleware,  updateFooter);
router.delete('/footer/:id', authMiddleware, deleteFooter);

module.exports = router;