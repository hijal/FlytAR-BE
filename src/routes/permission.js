const express = require('express');
const {
  createPermission,
  deletePermission,
  getAllPermissions,
  updatePermission
} = require('../controllers/permissionController');
const { validate, permissionValidationSchema } = require('./validation/permission');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['permission:list']), getAllPermissions);
router.post('/', authorize(['permission:create']), validate(permissionValidationSchema.create), createPermission);
router.patch('/:id', authorize(['permission:update']), validate(permissionValidationSchema.update), updatePermission);
router.delete('/:id', authorize(['permission:delete']), deletePermission);

module.exports = router;
