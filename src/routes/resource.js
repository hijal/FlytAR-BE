const express = require('express');
const {
  getAllResources,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { validate, resourceValidationSchema } = require('./validation/resource');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllResources);
router.post('/', validate(resourceValidationSchema.create), createResource);
router.patch('/:id', validate(resourceValidationSchema.update), updateResource);
router.delete('/:id', deleteResource);

module.exports = router;
