const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const leadValidationSchema = {
  create: Joi.object({
    sourceId: Joi.number().integer().optional().messages({
      'number.base': 'sourceId must be a number'
    }),
    assignedToCompanyId: Joi.number().integer().optional().messages({
      'number.base': 'assignedToCompanyId must be a number'
    }),
    assignedToEmployeeId: Joi.number().integer().optional().messages({
      'number.base': 'assignedToEmployeeId must be a number'
    }),
    assignedBy: Joi.number().integer().optional().messages({
      'number.base': 'assignedBy must be a number',
      'any.required': 'assignedBy is required'
    }),
    customerName: Joi.string().max(100).required().messages({
      'string.empty': 'Customer name is required',
      'string.max': 'Customer name must be at most 100 characters'
    }),
    customerEmail: Joi.string().email().required().messages({
      'string.email': 'Must be a valid email address'
    }),
    customerPhone: Joi.string().max(20).required().messages({
      'string.max': 'Customer phone must be at most 20 characters'
    }),
    pickupAddress: Joi.string().required().messages({
      'string.empty': 'Pickup address is required'
    }),
    deliveryAddress: Joi.string().required().messages({
      'string.empty': 'Delivery address is required'
    }),
    propertyTypeId: Joi.number().integer().required().messages({
      'number.base': 'Property type ID must be a number',
      'any.required': 'Property type is required'
    }),
    residentsCount: Joi.number().integer().optional().messages({
      'number.base': 'Residents count must be a number'
    }),
    movingDate: Joi.date().required().messages({
      'date.base': 'Moving date must be a valid date',
      'any.required': 'Moving date is required'
    }),
    estimatedPrice: Joi.number().required(),
    statusId: Joi.number().integer().optional().messages({
      'number.base': 'Status ID must be a number'
    }),
    priorityId: Joi.number().integer().optional().messages({
      'number.base': 'Priority ID must be a number'
    }),
    contactedAt: Joi.date().optional(),
    notes: Joi.string().optional()
  }),

  update: Joi.object({
    sourceId: Joi.number().integer().optional(),
    assignedToCompanyId: Joi.number().integer().optional(),
    assignedToEmployeeId: Joi.number().integer().optional(),
    assignedBy: Joi.number().integer().optional(),
    customerName: Joi.string().max(100).optional(),
    customerEmail: Joi.string().email().optional(),
    customerPhone: Joi.string().max(20).optional(),
    pickupAddress: Joi.string().optional(),
    deliveryAddress: Joi.string().optional(),
    propertyTypeId: Joi.number().integer().optional(),
    residentsCount: Joi.number().integer().optional(),
    movingDate: Joi.date().optional(),
    estimatedPrice: Joi.number().optional(),
    statusId: Joi.number().integer().optional().valid(1, 2, 3, 4),
    priorityId: Joi.number().integer().optional().valid(1, 2, 3, 4),
    contactedAt: Joi.date().optional(),
    notes: Joi.string().optional(),
    convertedToJobId: Joi.number().integer().optional(),
    convertedAt: Joi.date().optional()
  }).min(1)
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === leadValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(leadValidationSchema.update.describe().keys).join(', ');
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

module.exports = { leadValidationSchema, validate };
