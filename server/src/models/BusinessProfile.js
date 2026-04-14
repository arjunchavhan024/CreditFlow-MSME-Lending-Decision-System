const mongoose = require('mongoose');

const BusinessProfileSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true
    },
    pan: {
        type: String,
        required: [true, 'PAN is required'],
        unique: true,
        uppercase: true,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please provide a valid PAN number']
    },
    businessType: {
        type: String,
        required: [true, 'Business type is required'],
        enum: ['Retail', 'Manufacturing', 'Services']
    },
    monthlyRevenue: {
        type: Number,
        required: [true, 'Monthly revenue is required'],
        min: [0, 'Monthly revenue cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BusinessProfile', BusinessProfileSchema);
