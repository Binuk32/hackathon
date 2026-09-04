const Tool = require('../models/Tool');

// @desc    Get all tools
// @route   GET /api/tools
// @access  Public
exports.getTools = async (req, res) => {
    try {
        const tools = await Tool.find().sort({ createdAt: -1 });
        res.json(tools);
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to retrieve tools', error: error.message });
    }
};

// @desc    Create a new tool
// @route   POST /api/tools
// @access  Private (Admin)
exports.createTool = async (req, res) => {
    try {
        const { name, description, image, quantity, totalQuantity } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Tool name is required.' });
        }

        const qtyValue = quantity !== undefined ? quantity : totalQuantity;
        const parsedQuantity = parseInt(qtyValue, 10);

        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number greater than 0.' });
        }

        // Per Spec: when creating a new tool, totalQuantity = quantity entered, availableQuantity = quantity entered
        const tool = new Tool({
            name: name.trim(),
            description: description ? description.trim() : '',
            image: image ? image.trim() : '',
            totalQuantity: parsedQuantity,
            availableQuantity: parsedQuantity
        });

        const createdTool = await tool.save();
        res.status(201).json(createdTool);
    } catch (error) {
        console.error('Error creating tool:', error);
        res.status(500).json({ message: 'Failed to create tool', error: error.message });
    }
};
