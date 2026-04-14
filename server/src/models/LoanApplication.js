const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessProfile',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Loan amount is required'],
        min: [1, 'Loan amount must be at least 1']
    },
    tenure: {
        type: Number,
        required: [true, 'Tenure is required'],
        min: [1, 'Tenure must be at least 1 month']
    },
    purpose: {
        type: String,
        required: [true, 'Loan purpose is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    creditScore: {
        type: Number,
        default: 0
    },
    reasons: {
        type: [String],
        default: []
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);
