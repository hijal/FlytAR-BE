const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const permissionValidationSchema = {
  create: Joi.object({
    tag: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Tag must follow the format resource:action (e.g., user:create)'
      }),

    resource: Joi.string().min(2).max(50).required(),

    action: Joi.string().valid('get', 'list', 'create', 'update', 'delete').required(),

    description: Joi.string().min(2).max(255).optional()
  }),

  update: Joi.object({
    tag: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+$/)
      .messages({
        'string.pattern.base': 'Tag must follow the format resource:action (e.g., user:create)'
      }),

    resource: Joi.string().min(2).max(50).optional(),

    action: Joi.string().valid('get', 'list', 'create', 'update', 'delete').optional(),

    description: Joi.string().min(2).max(255).optional()
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

module.exports = {
  permissionValidationSchema,
  validate
};
