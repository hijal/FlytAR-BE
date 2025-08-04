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
  }).min(1)
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === permissionValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(permissionValidationSchema.update.describe().keys).join(', ');
      return next(
        new AppError(`At least one field must be provided for update. Allowed fields: ${allowedFields}`, 400)
      );
    }

    const { error } = schema.validate(data);
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
