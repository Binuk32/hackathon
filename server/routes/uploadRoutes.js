const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

// POST /api/upload - Single image upload
router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        // Return the hosted Cloudinary URL to save in MongoDB
        res.status(200).json({ imageUrl: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;