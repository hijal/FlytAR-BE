const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const roleRoutes = require('./role');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

module.exports = router;
