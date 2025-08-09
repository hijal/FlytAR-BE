const express = require('express');
const { getAllLeads, createLead, deleteLead, getLeadById, updateLead } = require('../controllers/leadController');
const { validate, leadValidationSchema } = require('./validation/lead');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['lead:list']), getAllLeads);
router.get('/:id', authorize(['lead:get']), getLeadById);
router.post('/', validate(leadValidationSchema.create), createLead);
router.patch('/:id', authorize(['lead:update']), validate(leadValidationSchema.update), updateLead);
router.delete('/:id', authorize(['lead:delete']), deleteLead);

module.exports = router;
