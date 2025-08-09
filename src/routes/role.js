const express = require('express');
const {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  assignPermissions,
  removePermissions,
  rolePermissions
} = require('../controllers/roleController');
const { validate, roleValidationSchema } = require('./validation/role');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['role:list']), getAllRoles);
router.get('/:id', authorize(['role:get']), getRoleById);
router.post('/', authorize(['role:create']), validate(roleValidationSchema.create), createRole);
router.patch('/:id', authorize(['role:update']), validate(roleValidationSchema.update), updateRole);
router.delete('/:id', authorize(['role:delete']), deleteRole);
router.get('/:id/permissions', authorize(['role:get']), rolePermissions);

router.post(
  '/:id/permissions',
  authorize(['role:update']),
  validate(roleValidationSchema.assignPermission),
  assignPermissions
);
router.delete(
  '/:id/permissions',
  authorize(['role:update']),
  validate(roleValidationSchema.removePermission),
  removePermissions
);

module.exports = router;
