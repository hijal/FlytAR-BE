const express = require('express');
const { createRole, updateRole, deleteRole, getAllRoles, getRoleById } = require('../controllers/roleController');
const { validate, roleValidationSchema } = require('./validation/role');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.post('/', validate(roleValidationSchema.create), createRole);
router.patch('/:id', validate(roleValidationSchema.update), updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
