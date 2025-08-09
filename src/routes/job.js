const express = require('express');
const { createJob, deleteJob, getAllJobs, getJobById, updateJob } = require('../controllers/jobController');
const { validate, jobValidationSchema } = require('./validation/job');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['job:list']), getAllJobs);
router.get('/:id', authorize(['job:get']), getJobById);
router.post('/', authorize(['job:create']), validate(jobValidationSchema.create), createJob);
router.patch('/:id', authorize(['job:update']), validate(jobValidationSchema.update), updateJob);
router.delete('/:id', authorize(['job:delete']), deleteJob);

module.exports = router;
