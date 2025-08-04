const { Company } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class CompanyService {
  static async getAllCompanies() {
    const companies = await Company.findAll({
      order: [['created_at', 'DESC']],
      include: ['creator']
    });

    return {
      data: {
        companies
      }
    };
  }

  static async getCompanyById(id) {
    const company = await Company.findByPk(id, {
      include: ['creator']
    });

    if (!company) {
      throw new AppError('No company found with that ID', 404);
    }

    return {
      data: {
        company
      }
    };
  }

  static async createCompany(companyData) {
    return await Company.create(companyData);
  }

  static async updateCompany(id, updateData) {
    const company = await Company.findByPk(id);

    if (!company) {
      throw new AppError('No company found with that ID', 404);
    }

    return await company.update(updateData);
  }

  static async deleteCompany(id) {
    const company = await Company.findByPk(id);

    if (!company) {
      throw new AppError('No company found with that ID', 404);
    }

    return await company.destroy();
  }
}

module.exports = CompanyService;
