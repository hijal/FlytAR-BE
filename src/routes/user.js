const express = require('express');
const { authenticate } = require('../middleware/auth');
const { validate, userValidationSchema } = require('./validation/auth');
const { getAllUsers, getUser, updateUser, getMe } = require('../controllers/userController');

const router = express.Router();

router.use(authenticate);

router.get('/me', getMe);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/update/:id', validate(userValidationSchema.update), updateUser);

module.exports = router;
