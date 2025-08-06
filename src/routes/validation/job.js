const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const jobValidationSchema = {
  create: Joi.object({
    companyId: Joi.number().required().messages({
      'any.required': 'Company ID is required'
    }),
    leadId: Joi.number().optional(),
    customerId: Joi.number().optional(),
    assignedSurveyorId: Joi.number().optional(),
    assignedMoverId: Joi.number().optional(),
    customerName: Joi.string().max(100).required().messages({
      'string.empty': 'Customer name is required'
    }),
    customerEmail: Joi.string().email().optional(),
    customerPhone: Joi.string().max(15).optional(),
    pickupAddress: Joi.string().required().messages({
      'string.empty': 'Pickup address is required'
    }),
    deliveryAddress: Joi.string().optional(),
    jobDate: Joi.date().required().messages({
      'date.base': 'Job date must be a valid date',
      'any.required': 'Job date is required'
    }),
    status: Joi.string().valid('pending', 'scheduled', 'in_progress', 'completed', 'cancelled').optional(),
    estimatedHours: Joi.number().optional(),
    totalPrice: Joi.number().optional()
  }),

  update: Joi.object({
    companyId: Joi.number().optional(),
    leadId: Joi.number().optional(),
    customerId: Joi.number().optional(),
    assignedSurveyorId: Joi.number().optional(),
    assignedMoverId: Joi.number().optional(),
    customerName: Joi.string().max(100).optional(),
    customerEmail: Joi.string().email().optional(),
    customerPhone: Joi.string().max(15).optional(),
    pickupAddress: Joi.string().optional(),
    deliveryAddress: Joi.string().optional(),
    jobDate: Joi.date().optional(),
    status: Joi.string().valid('pending', 'scheduled', 'in_progress', 'completed', 'cancelled').optional(),
    estimatedHours: Joi.number().optional(),
    totalPrice: Joi.number().optional()
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
