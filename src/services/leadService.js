const { Lead } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class LeadService {
  static async getAllLeads() {
    const leads = await Lead.findAll({
      order: [['created_at', 'DESC']]
    });

    return {
      data: {
        leads
      }
    };
  }

  static async getLeadById(id) {
    const lead = await Lead.findByPk(id, {});

    if (!lead) {
      throw new AppError('No lead found with that ID', 404);
    }

    return {
      data: {
        lead
      }
    };
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
