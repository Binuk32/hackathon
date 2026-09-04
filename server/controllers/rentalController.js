const Rental = require('../models/Rental');
const Tool = require('../models/Tool');

// @desc    Create new rental transaction
// @route   POST /api/rentals
// @access  Private
exports.createRental = async (req, res) => {
    try {
        const {itemId, customerName, customerPhone, returnDate, totalDays, quantity = 1, costPerDay} = req.body;

        const tool = await Tool.findById(itemId);
        if (!tool) {
            return res.status(404).json({message: 'Tool not found'});
        }

        const requestedQty = Number(quantity);
        if (tool.availableQuantity < requestedQty) {
            return res.status(400).json({
                message: `Insufficient stock. Only ${tool.availableQuantity} unit(s) available.`
            });
        }

        const dailyRate = costPerDay !== undefined ? Number(costPerDay) : Number(tool.costPerDay || 0);
        const days = Number(totalDays);
        const calculatedTotalAmount = requestedQty * dailyRate * days;

        const rental = new Rental({
            itemId,
            customerName,
            customerPhone,
            quantity: requestedQty,
            costPerDay: dailyRate,
            returnDate,
            totalDays: days,
            totalAmount: calculatedTotalAmount,
            status: 'Active'
        });

        await rental.save();

        tool.availableQuantity -= requestedQty;
        await tool.save();

        res.status(201).json(rental);
    } catch (error) {
        res.status(500).json({message: 'Failed to create rental', error: error.message});
    }
};

// @desc    Return a tool
// @route   PUT /api/rentals/:id/return
// @access  Private
exports.returnTool = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({message: 'Rental record not found'});
        }

        if (rental.status === 'Returned') {
            return res.status(400).json({message: 'Rental is already marked as returned'});
        }

        rental.status = 'Returned';
        await rental.save();

        const tool = await Tool.findById(rental.itemId);
        if (tool) {
            tool.availableQuantity += rental.quantity || 1;
            await tool.save();
        }

        res.json({message: 'Tool returned successfully', rental});
    } catch (error) {
        res.status(500).json({message: 'Failed to complete return', error: error.message});
    }
};

// @desc    Get all rentals
// @route   GET /api/rentals
// @access  Public/Private
exports.getRentals = async (req, res) => {
    try {
        const rentals = await Rental.find()
            .populate('itemId', 'name image costPerDay category')
            .sort({createdAt: -1});
        res.json(rentals);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch rentals', error: error.message});
    }
};

// @desc    Get single rental details by ID
// @route   GET /api/rentals/:id
// @access  Public/Private
exports.getRentalById = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id)
            .populate('itemId', 'name image costPerDay category totalQuantity availableQuantity');

        if (!rental) {
            return res.status(404).json({message: 'Rental record not found'});
        }

        res.json(rental);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch rental record', error: error.message});
    }
};