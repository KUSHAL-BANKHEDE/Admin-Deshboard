const express = require('express');
const { getAllServices, createService, updateServices, deleteService } = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',getAllServices);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateServices);
router.delete('/:id', authMiddleware, deleteService);

module.exports = router;