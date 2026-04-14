const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController');

router.post('/apply', LoanController.submitApplication);
router.get('/:id', LoanController.getApplicationById);

module.exports = router;
