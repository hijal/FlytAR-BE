const express = require('express');
const {
  getAllCompanies,
  createCompany,
  deleteCompany,
  getCompanyById,
  updateCompany
} = require('../controllers/companyController');
const { validate, companyValidationSchema } = require('./validation/company');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getAllCompanies);
router.get('/:id', protect, getCompanyById);
router.post('/', validate(companyValidationSchema.create), protect, createCompany);
router.patch('/:id', validate(companyValidationSchema.update), protect, updateCompany);
router.delete('/:id', protect, deleteCompany);

module.exports = router;
