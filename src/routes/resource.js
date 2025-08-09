const express = require('express');
const {
  getAllResources,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { validate, resourceValidationSchema } = require('./validation/resource');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['resource:list']), getAllResources);
router.post('/', authorize(['resource:create']), validate(resourceValidationSchema.create), createResource);
router.patch('/:id', authorize(['resource:update']), validate(resourceValidationSchema.update), updateResource);
router.delete('/:id', authorize(['resource:delete']), deleteResource);

module.exports = router;
