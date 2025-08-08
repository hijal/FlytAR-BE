const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const roleValidationSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(50).optional()
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    description: Joi.string().min(2).max(50).optional(),
    permissionIds: Joi.array().items(Joi.number().integer()).optional()
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update'
    })
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === roleValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(roleValidationSchema.update.describe().keys).join(', ');
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

module.exports = { roleValidationSchema, validate };
