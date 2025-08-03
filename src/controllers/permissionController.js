const PermissionService = require('../services/permissionService');

const getAllPermissions = async (req, res, next) => {
  try {
    const result = await PermissionService.getAllPermissions();
    res.status(200).json({
      status: 'success',
      ...result
    });
  } catch (error) {
    next(error);
  }
};

const createPermission = async (req, res, next) => {
  try {
    const permission = await PermissionService.createPermission(req.body);
    res.status(201).json({
      status: 'success',
      data: { permission }
    });
  } catch (error) {
    next(error);
  }
};

const updatePermission = async (req, res, next) => {
  try {
    const permission = await PermissionService.updatePermission(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: { permission }
    });
  } catch (error) {
    next(error);
  }
};

const deletePermission = async (req, res, next) => {
  try {
    await PermissionService.deletePermission(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPermissions,
  createPermission,
  updatePermission,
  deletePermission
};
