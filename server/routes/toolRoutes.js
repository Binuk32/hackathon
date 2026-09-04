const express = require('express');
const { getTools, createTool } = require('../controllers/toolController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getTools);
router.post('/', protect, createTool);

module.exports = router;
