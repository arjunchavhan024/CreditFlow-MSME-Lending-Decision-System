const LoanApplication = require('../models/LoanApplication');
const BusinessProfile = require('../models/BusinessProfile');
const DecisionEngine = require('../services/DecisionEngine');
const AuditService = require('../services/AuditService');

exports.submitApplication = async (req, res) => {
    try {
        const { businessId, amount, tenure, purpose } = req.body;

        const business = await BusinessProfile.findById(businessId);
        if (!business) {
            return res.status(404).json({ success: false, message: 'Business profile not found' });
        }

        // Evaluate application through Decision Engine
        const evaluation = DecisionEngine.evaluate(business, { amount, tenure });

        // Create loan application in DB
        const application = await LoanApplication.create({
            businessId,
            amount,
            tenure,
            purpose,
            status: evaluation.status,
            creditScore: evaluation.score,
            reasons: evaluation.reasons
        });

        AuditService.log('LOAN_SUBMISSION', { 
            applicationId: application._id, 
            status: evaluation.status, 
            score: evaluation.score 
        });

        res.status(201).json({
            success: true,
            data: application,
            message: `Application ${evaluation.status}`
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await LoanApplication.findById(req.params.id).populate('businessId');
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
