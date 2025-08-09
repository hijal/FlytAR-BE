const RoleService = require('../services/roleService');

const getAllRoles = async (req, res, next) => {
  try {
    const result = await RoleService.getAllRoles();
    res.status(200).json({
      status: 'success',
      ...result
    });
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const role = await RoleService.getRoleById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const role = await RoleService.createRole(req.body);
    res.status(201).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await RoleService.updateRole(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    await RoleService.deleteRole(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

const assignPermissions = async (req, res, next) => {
  try {
    const role = await RoleService.assignPermissions(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

const removePermissions = async (req, res, next) => {
  try {
    const role = await RoleService.removePermissions(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

const rolePermissions = async (req, res, next) => {
  try {
    const role = await RoleService.rolePermissions(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { role }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignPermissions,
  removePermissions,
  rolePermissions
};
