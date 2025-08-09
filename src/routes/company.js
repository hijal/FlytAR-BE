const express = require('express');
const {
  getAllCompanies,
  createCompany,
  deleteCompany,
  getCompanyById,
  updateCompany
} = require('../controllers/companyController');
const { validate, companyValidationSchema } = require('./validation/company');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['company:list']), getAllCompanies);
router.get('/:id', authorize(['company:get']), getCompanyById);
router.post('/', authorize(['company:create']), validate(companyValidationSchema.create), createCompany);
router.patch('/:id', authorize(['company:update']), validate(companyValidationSchema.update), updateCompany);
router.delete('/:id', authorize(['company:delete']), deleteCompany);

module.exports = router;
