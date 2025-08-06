const { Job } = require('../database/models');
const { AppError } = require('../middleware/errorHandler');

class JobService {
  static async getAllJobs() {
    const jobs = await Job.findAll({
      order: [['created_at', 'DESC']]
    });

    return {
      data: {
        jobs
      }
    };
  }

  static async getJobById(id) {
    const job = await Job.findByPk(id, {});

    if (!job) {
      throw new AppError('No job found with that ID', 404);
    }

    return {
      data: {
        job
      }
    };
  }

  static async createJob(jobData) {
    return await Job.create(jobData);
  }

  static async updateJob(id, updateData) {
    const job = await Job.findByPk(id);

    if (!job) {
      throw new AppError('No job found with that ID', 404);
    }

    return await job.update(updateData);
  }

  static async deleteJob(id) {
    const job = await Job.findByPk(id);

    if (!job) {
      throw new AppError('No job found with that ID', 404);
    }

    return await job.destroy();
  }
}

module.exports = JobService;
