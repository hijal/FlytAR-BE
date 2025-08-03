const express = require('express');
const { protect } = require('../middleware/auth');
const { validate, userValidationSchema } = require('./validation/user');
const { getAllUsers, getUser, updateUser, getMe } = require('../controllers/userController');

const router = express.Router();

router.get('/me', protect, getMe);
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUser);
router.patch('/update/:id', validate(userValidationSchema.update), protect, updateUser);

module.exports = router;
