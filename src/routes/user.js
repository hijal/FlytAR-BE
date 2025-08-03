const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validate, userValidationSchema } = require('../middleware/validation');

const router = express.Router();

router.get('/me', protect, getMe);
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUser);
router.patch('/update/:id', validate(userValidationSchema.update), protect, updateUser);
router.delete('/delete/:id', protect, deleteUser);

module.exports = router;
