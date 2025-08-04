const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const companyValidationSchema = {
  create: Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
      'string.empty': 'Company name is required',
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must be at most 100 characters'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Must be a valid email address'
    }),
    phone: Joi.string().max(20).optional().messages({
      'string.max': 'Phone number can be up to 20 characters'
    }),
    address: Joi.string().optional(),
    logoUrl: Joi.string().uri().optional().messages({
      'string.uri': 'Logo URL must be a valid URL'
    }),
    subscription: Joi.string().valid('basic', 'premium', 'enterprise').optional().messages({
      'any.only': 'Subscription must be one of basic, premium, or enterprise'
    }),
    createdBy: Joi.number().required().messages({
      'number.base': 'createdBy must be a valid user ID',
      'any.required': 'createdBy is required'
    })
  }),

  update: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().optional(),
    logoUrl: Joi.string().uri().optional(),
    isActive: Joi.boolean().optional(),
    subscription: Joi.string().valid('basic', 'premium', 'enterprise').optional()
  }).min(1)
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === companyValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(companyValidationSchema.update.describe().keys).join(', ');
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

module.exports = { companyValidationSchema, validate };
