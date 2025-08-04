const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const roleRoutes = require('./role');
const permissionRoutes = require('./permission');
const companyRoutes = require('./company');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/companies', companyRoutes);

module.exports = router;
