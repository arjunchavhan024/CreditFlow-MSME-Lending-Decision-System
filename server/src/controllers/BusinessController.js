const BusinessProfile = require('../models/BusinessProfile');
const AuditService = require('../services/AuditService');

exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { pan } = req.body;
        
        let profile = await BusinessProfile.findOne({ pan });
        
        if (profile) {
            // Update existing profile
            profile = await BusinessProfile.findOneAndUpdate({ pan }, req.body, { new: true, runValidators: true });
            AuditService.log('PROFILE_UPDATE', { pan, id: profile._id });
            return res.status(200).json({ success: true, data: profile, message: 'Profile updated' });
        }

        profile = await BusinessProfile.create(req.body);
        AuditService.log('PROFILE_CREATE', { pan, id: profile._id });
        res.status(201).json({ success: true, data: profile, message: 'Profile created' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await BusinessProfile.findById(req.params.id);
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
