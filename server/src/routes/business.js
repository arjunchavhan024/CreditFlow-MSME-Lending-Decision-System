const express = require('express');
const router = express.Namespace ? express.Namespace() : express.Router();
const BusinessController = require('../controllers/BusinessController');

router.post('/', BusinessController.createOrUpdateProfile);
router.get('/:id', BusinessController.getProfile);

module.exports = router;
