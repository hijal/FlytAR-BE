const express = require('express');
const {
  getAllResources,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { validate, resourceValidationSchema } = require('./validation/resource');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllResources);
router.post('/', validate(resourceValidationSchema.create), protect, createResource);
router.patch('/:id', validate(resourceValidationSchema.update), protect, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router;
