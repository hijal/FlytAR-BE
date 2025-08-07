const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const jobValidationSchema = {
  create: Joi.object({
    companyId: Joi.number().integer().required().messages({
      'any.required': 'Company ID is required'
    }),
    leadId: Joi.number().integer().allow(null).optional(),
    customerId: Joi.number().integer().allow(null).optional(),
    assignedSurveyorId: Joi.number().integer().allow(null).optional(),
    assignedMoverId: Joi.number().integer().allow(null).optional(),
    customerName: Joi.string().max(100).required().messages({
      'string.empty': 'Customer name is required'
    }),
    customerEmail: Joi.string().email().allow(null).optional(),
    customerPhone: Joi.string().max(20).allow(null).optional(),
    pickupAddress: Joi.string().allow(null).optional(),
    deliveryAddress: Joi.string().allow(null).optional(),
    jobDate: Joi.date().required().messages({
      'date.base': 'Job date must be a valid date',
      'any.required': 'Job date is required'
    }),
    statusId: Joi.number().integer().default(1).optional(),
    estimatedHours: Joi.number().precision(2).allow(null).optional(),
    totalPrice: Joi.number().precision(2).allow(null).optional()
  }),

  update: Joi.object({
    companyId: Joi.number().integer().optional(),
    leadId: Joi.number().integer().allow(null).optional(),
    customerId: Joi.number().integer().allow(null).optional(),
    assignedSurveyorId: Joi.number().integer().allow(null).optional(),
    assignedMoverId: Joi.number().integer().allow(null).optional(),
    customerName: Joi.string().max(100).optional(),
    customerEmail: Joi.string().email().allow(null).optional(),
    customerPhone: Joi.string().max(20).allow(null).optional(),
    pickupAddress: Joi.string().allow(null).optional(),
    deliveryAddress: Joi.string().allow(null).optional(),
    jobDate: Joi.date().optional(),
    statusId: Joi.number().integer().optional(),
    estimatedHours: Joi.number().precision(2).allow(null).optional(),
    totalPrice: Joi.number().precision(2).allow(null).optional()
  }).min(1)
};

const validate = (schema, schemaType = 'body') => {
  return (req, res, next) => {
    const data = req[schemaType];

    if (schema === jobValidationSchema.update && Object.keys(data).length === 0) {
      const allowedFields = Object.keys(jobValidationSchema.update.describe().keys).join(', ');
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

module.exports = { jobValidationSchema, validate };
