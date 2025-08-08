const express = require('express');
const { createJob, deleteJob, getAllJobs, getJobById, updateJob } = require('../controllers/jobController');
const { validate, jobValidationSchema } = require('./validation/job');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', validate(jobValidationSchema.create), createJob);
router.patch('/:id', validate(jobValidationSchema.update), updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
