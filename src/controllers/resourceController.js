const ResourceService = require('../services/resourceService');

const getAllResources = async (req, res, next) => {
  try {
    const resources = await ResourceService.getAllResources();
    res.status(200).json({
      status: 'success',
      data: resources
    });
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await ResourceService.createResource(req.body);
    res.status(201).json({
      status: 'success',
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resource = await ResourceService.updateResource(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    await ResourceService.deleteResource(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

const getResourceById = async (req, res, next) => {
  try {
    const resource = await ResourceService.getResourceById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};
