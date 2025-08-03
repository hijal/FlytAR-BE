const { ValidationError, DatabaseError, ConnectionError } = require('sequelize');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleSequelizeValidationError = (err) => {
  const errors = err.errors.map((error) => ({
    field: error.path,
    message: error.message,
    value: error.value
  }));

  return new AppError(`${errors.map((e) => e.message).join(', ')}`, 400);
};

const handleSequelizeUniqueConstraintError = (err) => {
  const field = err.errors[0].path;
  const value = err.errors[0].value;
  return new AppError(`${field} '${value}' already exists`, 400);
};

const handleSequelizeDatabaseError = (err) => {
  return new AppError('Database operation failed', 500);
};

const handleSequelizeConnectionError = (err) => {
  return new AppError('Database connection failed', 500);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again', 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: {
        statusCode: err.statusCode
      },
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

const ERROR_STATUS_MAP = {
  // JWT Errors
  TokenExpiredError: 401,
  JsonWebTokenError: 401,
  NotBeforeError: 401,

  // Sequelize Validation Errors
  SequelizeValidationError: 400,
  SequelizeUniqueConstraintError: 400,
  SequelizeForeignKeyConstraintError: 400,
  SequelizeExclusionConstraintError: 400,
  SequelizeCheckConstraintError: 400,

  // Sequelize Database Errors
  SequelizeDatabaseError: 500,
  SequelizeTimeoutError: 500,
  SequelizeConnectionTimedOutError: 500,
  SequelizeConnectionError: 500,
  SequelizeHostNotFoundError: 500,
  SequelizeHostNotReachableError: 500,
  SequelizeInvalidConnectionError: 500,
  SequelizeConnectionRefusedError: 500,
  SequelizeAccessDeniedError: 403,

  // PostgreSQL specific errors
  SequelizeEmptyResultError: 404,
  SequelizeOptimisticLockError: 409,
  SequelizeBulkRecordError: 400,
  SequelizeInstanceError: 400
};

const ERROR_MESSAGE_MAP = {
  // JWT Errors
  TokenExpiredError: 'Your token has expired. Please log in again',
  JsonWebTokenError: 'Invalid token. Please log in again',
  NotBeforeError: 'Token not active yet',

  // Sequelize Validation Errors
  SequelizeValidationError: 'Validation failed',
  SequelizeUniqueConstraintError: 'Resource already exists',
  SequelizeForeignKeyConstraintError: 'Referenced resource does not exist',
  SequelizeExclusionConstraintError: 'Resource violates exclusion constraint',
  SequelizeCheckConstraintError: 'Data violates check constraint',

  // Sequelize Database Errors
  SequelizeDatabaseError: 'Database operation failed',
  SequelizeTimeoutError: 'Database operation timed out',
  SequelizeConnectionTimedOutError: 'Database connection timed out',
  SequelizeConnectionError: 'Database connection failed',
  SequelizeHostNotFoundError: 'Database host not found',
  SequelizeHostNotReachableError: 'Database host not reachable',
  SequelizeInvalidConnectionError: 'Invalid database connection',
  SequelizeConnectionRefusedError: 'Database connection refused',
  SequelizeAccessDeniedError: 'Database access denied',

  // PostgreSQL specific errors
  SequelizeEmptyResultError: 'Resource not found',
  SequelizeOptimisticLockError: 'Resource was modified by another process',
  SequelizeBulkRecordError: 'Bulk operation failed',
  SequelizeInstanceError: 'Invalid instance operation'
};

const getErrorByName = (err) => {
  const statusCode = ERROR_STATUS_MAP[err.name] || 500;
  const message = ERROR_MESSAGE_MAP[err.name] || err.message || 'Something went wrong!';

  return new AppError(message, statusCode);
};

const processError = (err) => {
  let error;

  if (err instanceof ValidationError) {
    error = handleSequelizeValidationError(err);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    error = handleSequelizeUniqueConstraintError(err);
  } else if (err instanceof DatabaseError) {
    error = handleSequelizeDatabaseError(err);
  } else if (err instanceof ConnectionError) {
    error = handleSequelizeConnectionError(err);
  } else if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  } else if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  } else if (ERROR_STATUS_MAP[err.name]) {
    error = getErrorByName(err);
  } else {
    error = new AppError(err.message || 'Something went wrong!', err.statusCode || 500);
  }

  return error;
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    const processedError = processError(err);
    sendErrorDev(processedError, res);
  } else {
    const processedError = processError(err);
    sendErrorProd(processedError, res);
  }
};

module.exports = { AppError, globalErrorHandler };
