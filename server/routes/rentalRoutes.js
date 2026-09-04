const express = require('express');
const { createRental, returnTool, getRentals, getRentalById } = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getRentals);
router.get('/:id', getRentalById); // Fetch single rental record
router.post('/', protect, createRental);
router.put('/:id/return', protect, returnTool);

module.exports = router;