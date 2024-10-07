const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { getAllCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/category', getAllCategory);
router.post('/category', authMiddleware,  createCategory);
router.put('/category/:id', authMiddleware,  updateCategory);
router.delete('/category/:id', authMiddleware, deleteCategory);

module.exports = router;