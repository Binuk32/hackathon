const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
        required: true
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    customerPhone: {
        type: String,
        required: [true, 'Customer phone is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    costPerDay: {
        type: Number,
        required: [true, 'Cost per day is required'],
        min: [0, 'Cost per day cannot be negative'],
        default: 0
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Returned'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);