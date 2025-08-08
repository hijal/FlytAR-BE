const express = require('express');
const {
  getAllCompanies,
  createCompany,
  deleteCompany,
  getCompanyById,
  updateCompany
} = require('../controllers/companyController');
const { validate, companyValidationSchema } = require('./validation/company');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', validate(companyValidationSchema.create), createCompany);
router.patch('/:id', validate(companyValidationSchema.update), updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
