const express = require('express');
const { createJob, deleteJob, getAllJobs, getJobById, updateJob } = require('../controllers/jobController');
const { validate, jobValidationSchema } = require('./validation/job');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllJobs);
router.get('/:id', protect, getJobById);
router.post('/', validate(jobValidationSchema.create), protect, createJob);
router.patch('/:id', validate(jobValidationSchema.update), protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
