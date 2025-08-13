const { Lead, Company, User, LeadSource, PropertyType, LeadStatus, LeadPriority } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class LeadService {
  static async getAllLeads() {
    const leads = await Lead.findAll({
      order: [['created_at', 'DESC']]
    });

    return leads;
  }

  static async getLeadById(id) {
    const lead = await Lead.findByPk(id, {
      include: [
        {
          model: Company,
          as: 'assignedCompany'
        },
        {
          model: User,
          as: 'assignedEmployee'
        },
        {
          model: User,
          as: 'assigner'
        },
        {
          model: LeadSource,
          as: 'source'
        },
        {
          model: PropertyType,
          as: 'propertyType'
        },
        {
          model: LeadStatus,
          as: 'status'
        },
        {
          model: LeadPriority,
          as: 'priority'
        }
      ]
    });

    if (!lead) {
      throw new AppError('No lead found with that ID', 404);
    }

    return lead;
  }

  static async createLead(leadData) {
    return await Lead.create(leadData);
  }

  static async updateLead(id, updateData) {
    const lead = await Lead.findByPk(id);

    if (!lead) {
      throw new AppError('No lead found with that ID', 404);
    }

    return await lead.update(updateData);
  }

  static async deleteLead(id) {
    const lead = await Lead.findByPk(id);

    if (!lead) {
      throw new AppError('No lead found with that ID', 404);
    }

    return await lead.destroy();
  }
}

module.exports = LeadService;
