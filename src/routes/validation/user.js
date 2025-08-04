const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const userValidationSchema = {
  create: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().optional(),
    profilePicture: Joi.string().uri().optional(),
    roleId: Joi.number().integer().optional(),
    company_id: Joi.number().integer().optional(),
    invitedBy: Joi.number().integer().optional()
  }),

  update: Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email().max(100),
    password: Joi.string().min(6).max(255),
    phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/),
    profilePicture: Joi.string().uri(),
    isActive: Joi.boolean(),
    roleId: Joi.number().integer(),
    company_id: Joi.number().integer(),
    invitedBy: Joi.number().integer()
  }).min(1),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(message, 400));
    }
    next();
  };
};

module.exports = { userValidationSchema, validate };
