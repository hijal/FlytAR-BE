const express = require('express');
const {
  createPermission,
  deletePermission,
  getAllPermissions,
  updatePermission
} = require('../controllers/permissionController');
const { validate, permissionValidationSchema } = require('./validation/permission');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllPermissions);
router.post('/', validate(permissionValidationSchema.create), createPermission);
router.patch('/:id', validate(permissionValidationSchema.update), updatePermission);
router.delete('/:id', deletePermission);

module.exports = router;
