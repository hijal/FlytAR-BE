const JobService = require('../services/jobService');

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.status(200).json({
      status: 'success',
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await JobService.getJobById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const job = await JobService.createJob(req.body);
    res.status(201).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await JobService.updateJob(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    await JobService.deleteJob(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
