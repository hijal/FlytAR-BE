const Joi = require('joi');
const { AppError } = require('../../middleware/errorHandler');

const roleValidationSchema = {
  create: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(50).optional()
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    description: Joi.string().min(2).max(50).optional()
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

module.exports = { roleValidationSchema, validate };
