const express = require('express');
const { createUser, login } = require('../controllers/userController');
const { validate, userValidationSchema } = require('./validation/auth');

const router = express.Router();

router.post('/signup', validate(userValidationSchema.create), createUser);
router.post('/signin', validate(userValidationSchema.login), login);

module.exports = router;
