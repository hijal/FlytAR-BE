const express = require('express');
const {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
  getResourceById
} = require('../controllers/resourceController');
const { validate, resourceValidationSchema } = require('./validation/resource');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['resource:list']), getAllResources);
router.get('/:id', authorize(['resource:get']), getResourceById);
router.post('/', authorize(['resource:create']), validate(resourceValidationSchema.create), createResource);
router.patch('/:id', authorize(['resource:update']), validate(resourceValidationSchema.update), updateResource);
router.delete('/:id', authorize(['resource:delete']), deleteResource);

module.exports = router;
