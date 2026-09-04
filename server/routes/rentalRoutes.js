const express = require('express');
const { createRental, returnTool, getRentals } = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getRentals);
router.post('/', protect, createRental);
router.put('/:id/return', protect, returnTool);

module.exports = router;