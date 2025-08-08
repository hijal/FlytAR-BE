const express = require('express');
const { getAllLeads, createLead, deleteLead, getLeadById, updateLead } = require('../controllers/leadController');
const { validate, leadValidationSchema } = require('./validation/lead');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.post('/', validate(leadValidationSchema.create), createLead);
router.patch('/:id', validate(leadValidationSchema.update), updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
