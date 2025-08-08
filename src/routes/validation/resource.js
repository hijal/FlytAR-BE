const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const resourceValidationSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    slug: Joi.string().min(2).max(100).required(),
    link: Joi.string().optional().allow(null, ''),
    description: Joi.string().optional().allow(null, ''),
    isActive: Joi.boolean().optional()
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    slug: Joi.string().min(2).max(100).optional(),
    link: Joi.string().optional().allow(null, ''),
    description: Joi.string().optional().allow(null, ''),
    isActive: Joi.boolean().optional()
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update'
    })
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === resourceValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(resourceValidationSchema.update.describe().keys).join(', ');
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

module.exports = { resourceValidationSchema, validate };
