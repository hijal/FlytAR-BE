const CompanyService = require('../services/companyService');

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json({
      status: 'success',
      data: companies
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: company
    });
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  try {
    const company = await CompanyService.createCompany(req.body);
    res.status(201).json({
      status: 'success',
      data: company
    });
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const company = await CompanyService.updateCompany(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: company
    });
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    await CompanyService.deleteCompany(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
