const express = require('express');
const { getAllServices, createService, updateServices, deleteService } = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/services',getAllServices);
router.post('/services', authMiddleware,  createService);
router.put('/services/:id', authMiddleware,  updateServices);
router.delete('/services/:id', authMiddleware, deleteService);

module.exports = router;