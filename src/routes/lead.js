const express = require('express');
const { getAllLeads, createLead, deleteLead, getLeadById, updateLead } = require('../controllers/leadController');
const { validate, leadValidationSchema } = require('./validation/lead');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllLeads);
router.get('/:id', protect, getLeadById);
router.post('/', validate(leadValidationSchema.create), protect, createLead);
router.patch('/:id', validate(leadValidationSchema.update), protect, updateLead);
router.delete('/:id', protect, deleteLead);

module.exports = router;
