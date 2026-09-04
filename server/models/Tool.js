const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tool name is required'],
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    totalQuantity: {
        type: Number,
        required: [true, 'Total quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Available quantity is required'],
        min: [0, 'Quantity cannot be negative']
    }
}, { timestamps: true });

module.exports = mongoose.model('Tool', toolSchema);
