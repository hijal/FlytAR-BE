const express = require('express');
const {
  createPermission,
  deletePermission,
  getAllPermissions,
  updatePermission
} = require('../controllers/permissionController');
const { validate, permissionValidationSchema } = require('./validation/permission');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllPermissions);
router.post('/', validate(permissionValidationSchema.create), protect, createPermission);
router.patch('/:id', validate(permissionValidationSchema.update), protect, updatePermission);
router.delete('/:id', protect, deletePermission);

module.exports = router;
