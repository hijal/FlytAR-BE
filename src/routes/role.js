const express = require('express');
const { createRole, updateRole, deleteRole, getAllRoles } = require('../controllers/roleController');
const { validate, roleValidationSchema } = require('./validation/role');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllRoles);
router.post('/', validate(roleValidationSchema.create), protect, createRole);
router.patch('/:id', validate(roleValidationSchema.update), protect, updateRole);
router.delete('/:id', protect, deleteRole);

module.exports = router;
