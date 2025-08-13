const LeadService = require('../services/leadService');

const getAllLeads = async (req, res, next) => {
  try {
    const leads = await LeadService.getAllLeads();
    res.status(200).json({
      status: 'success',
      data: leads
    });
  } catch (error) {
    next(error);
  }
};

const getLeadById = async (req, res, next) => {
  try {
    const lead = await LeadService.getLeadById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

const createLead = async (req, res, next) => {
  try {
    const lead = await LeadService.createLead(req.body);
    res.status(201).json({
      status: 'success',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const lead = await LeadService.updateLead(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    await LeadService.deleteLead(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
};
