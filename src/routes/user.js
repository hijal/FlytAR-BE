const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { validate, userValidationSchema } = require('./validation/auth');
const { getAllUsers, getUser, updateUser, getMe, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.use(authenticate);

router.get('/me', getMe);
router.get('/', authorize(['user:list']), getAllUsers);
router.get('/:id', authorize(['user:get']), getUser);
router.patch('/update/:id', authorize(['user:update']), validate(userValidationSchema.update), updateUser);
router.delete('/delete/:id', authorize(['user:delete']), deleteUser);

module.exports = router;
